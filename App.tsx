
import React, { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import LessonView from './components/LessonView';
import SubjectPicker from './components/SubjectPicker';
import ApushPath from './components/ApushPath';
import Settings from './components/Settings';
import GlobeyMascot from './components/GlobeyMascot';
import { UserProfile, AppState, SkillType, LessonData } from './types';
import { generateLessonContent } from './services/geminiService';
import { apiService } from './services/apiService';
import { REGIONS, APUSH_UNITS, APUSH_QUESTS } from './constants';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('ONBOARDING');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [currentLesson, setCurrentLesson] = useState<LessonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastScore, setLastScore] = useState<number | null>(null);

  // Initialize from Firebase/LocalStorage
  useEffect(() => {
    const initApp = async () => {
      try {
        const profile = await apiService.loadProfile();
        if (profile) {
          setUser(profile);
          setAppState('DASHBOARD');
          if (profile.theme === 'dark') document.body.classList.add('dark');
        } else {
          setAppState('ONBOARDING');
        }
      } catch (e) {
        console.error("Init failed", e);
        setAppState('ONBOARDING');
      } finally {
        setLoading(false);
      }
    };
    initApp();
  }, []);

  const updateProfile = async (profile: UserProfile) => {
    setUser(profile);
    setIsSyncing(true);
    
    if (profile.theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    await apiService.saveProfile(profile);
    setTimeout(() => setIsSyncing(false), 800);
  };

  const handleOnboardingComplete = (profile: UserProfile) => {
    updateProfile({
      ...profile,
      completedApushQuests: []
    });
    setAppState('DASHBOARD');
  };

  const selectSkill = (skill: SkillType) => {
    if (skill === SkillType.APUSH) {
      setAppState('APUSH_PATH');
    } else {
      startLesson(skill);
    }
  };

  const startLesson = async (skill: SkillType, unitId?: string, questId?: string) => {
    if (!user) return;
    setLoading(true);
    try {
      let subjectLabel = '';
      let questTopic = '';
      
      if (skill === SkillType.APUSH && unitId && questId) {
        const unit = APUSH_UNITS.find(u => u.id === unitId);
        const quest = APUSH_QUESTS[unitId]?.find(q => q.id === questId);
        subjectLabel = unit ? unit.name : 'APUSH';
        questTopic = quest ? `${quest.name}: ${quest.topic}` : '';
      } else {
        const isHistory = skill === SkillType.APWH;
        const region = isHistory ? { name: 'Global', id: 'global' } : REGIONS[Math.floor(Math.random() * REGIONS.length)];
        subjectLabel = region.name;
      }
      
      const data = await generateLessonContent(subjectLabel, skill, user.goal, questTopic);
      setCurrentLesson({ ...data, unitId, questId });
      setAppState('LESSON');
    } catch (error) {
      alert("Globey is having trouble connecting to history! Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLessonFinish = (score: number) => {
    if (!user || !currentLesson) return;
    setLastScore(score);
    
    const xpGain = score * 50;
    const newXP = user.xp + xpGain;
    const newLevel = Math.floor(newXP / 1000) + 1;
    const newPracticedTime = (user.minutesPracticedToday || 0) + 2;

    const isQuestPassed = score >= 4;
    const currentQuestId = currentLesson.questId;
    const currentUnitId = currentLesson.unitId;

    const newCompletedQuests = isQuestPassed && currentQuestId 
        ? [...new Set([...(user.completedApushQuests || []), currentQuestId])]
        : (user.completedApushQuests || []);

    const unitQuests = currentUnitId ? (APUSH_QUESTS[currentUnitId] || []) : [];
    const isUnitNowComplete = currentUnitId && unitQuests.length > 0 && unitQuests.every(q => newCompletedQuests.includes(q.id));

    const newCompletedUnits = isUnitNowComplete && currentUnitId
        ? [...new Set([...user.completedApushUnits, currentUnitId])]
        : user.completedApushUnits;

    const updatedUser: UserProfile = {
      ...user,
      xp: newXP,
      level: newLevel,
      minutesPracticedToday: newPracticedTime,
      lastLesson: {
        skill: currentLesson.skillType,
        unitId: currentLesson.unitId,
        questId: currentLesson.questId
      },
      completedApushQuests: newCompletedQuests,
      completedApushUnits: newCompletedUnits,
      badges: score === 5 ? [...new Set([...user.badges, 'first_step'])] : user.badges
    };
    
    if (isUnitNowComplete || (updatedUser.completedApushQuests.length >= 10)) {
      if (!updatedUser.badges.includes('historian')) {
        updatedUser.badges.push('historian');
      }
    }

    updateProfile(updatedUser);
    setAppState('SUMMARY');
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center p-8 text-center">
          <div className="animate-float mb-8">
             <GlobeyMascot isThinking message="Syncing with the Firebase cloud... One moment!" />
          </div>
          <div className="flex gap-3 justify-center">
            <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce [animation-duration:0.6s]"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.2s]"></div>
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.4s]"></div>
          </div>
        </div>
      );
    }

    if (appState === 'ONBOARDING') {
      return <Onboarding onComplete={handleOnboardingComplete} />;
    }

    if (appState === 'DASHBOARD' && user) {
      return (
        <Dashboard 
          user={user} 
          isSyncing={isSyncing}
          onStartLesson={() => setAppState('SUBJECT_PICKER')} 
          onContinueLast={() => {
            if (user.lastLesson) {
              startLesson(user.lastLesson.skill, user.lastLesson.unitId, user.lastLesson.questId);
            }
          }}
        />
      );
    }

    if (appState === 'SUBJECT_PICKER') {
      return (
        <SubjectPicker 
          onSelect={selectSkill} 
          onBack={() => setAppState('DASHBOARD')}
        />
      );
    }

    if (appState === 'APUSH_PATH' && user) {
      return (
        <ApushPath 
          user={user} 
          onSelectQuest={(unitId, questId) => startLesson(SkillType.APUSH, unitId, questId)}
          onBack={() => setAppState('SUBJECT_PICKER')}
        />
      );
    }

    if (appState === 'SETTINGS' && user) {
      return (
        <Settings 
          user={user} 
          onUpdate={updateProfile}
        />
      );
    }

    if (appState === 'LESSON' && currentLesson) {
      return (
        <LessonView 
          lesson={currentLesson} 
          onExit={() => setAppState('DASHBOARD')}
          onFinish={handleLessonFinish}
        />
      );
    }

    if (appState === 'SUMMARY' && user && lastScore !== null) {
      return (
        <div className="min-h-screen bg-sky-50 dark:bg-slate-900 flex flex-col items-center justify-center p-6 pb-32 space-y-10 page-enter">
          <div className="animate-float">
             <GlobeyMascot 
               emotion="happy" 
               message={lastScore === 5 ? "ABSOLUTELY PERFECT! Progress saved to Firebase!" : `Magnificent effort! You got ${lastScore}/5 correct!`} 
             />
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-10 rounded-[3.5rem] shadow-2xl shadow-blue-900/10 w-full max-w-md border-t-8 border-blue-500 text-center relative overflow-hidden">
            <h2 className="text-4xl font-fredoka text-slate-800 dark:text-white mb-2">Adventure Summary</h2>
            <div className="text-7xl my-10 filter drop-shadow-xl animate-bounce">
              {lastScore === 5 ? '👑' : '🏆'}
            </div>
            <div className="space-y-6 mb-10">
              <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-700 p-4 rounded-3xl border border-slate-100 dark:border-slate-600">
                <span className="text-slate-400 font-black uppercase text-xs tracking-widest">Mastery</span>
                <span className="text-2xl font-fredoka text-green-600 dark:text-green-400">{lastScore} / 5</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-700 p-4 rounded-3xl border border-slate-100 dark:border-slate-600">
                <span className="text-slate-400 font-black uppercase text-xs tracking-widest">Rewards</span>
                <span className="text-2xl font-fredoka text-yellow-500">+{lastScore * 50} ⭐</span>
              </div>
            </div>
            <button 
              onClick={() => setAppState('DASHBOARD')}
              className="w-full bg-slate-900 dark:bg-blue-600 text-white p-6 rounded-[2rem] font-black text-xl shadow-2xl shadow-slate-900/30 hover:bg-slate-800 transition-all active:scale-95"
            >
              Finish Chapter
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="relative min-h-screen">
      {renderContent()}

      {/* Persistent Bottom Nav */}
      {appState !== 'ONBOARDING' && !loading && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50">
          <nav className="bg-slate-900/90 dark:bg-slate-800/95 backdrop-blur-xl border border-white/10 p-2.5 rounded-[2.5rem] flex justify-around shadow-2xl shadow-slate-900/40">
            <button 
              onClick={() => user && setAppState('DASHBOARD')}
              className={`flex flex-col items-center gap-1 p-3 rounded-[1.5rem] transition-all ${appState === 'DASHBOARD' || appState === 'SUBJECT_PICKER' || appState === 'APUSH_PATH' ? 'bg-white/10 text-white' : 'text-slate-400'}`}
            >
              <span className="text-xl">🏠</span>
              <span className="text-[10px] font-bold uppercase">Learn</span>
            </button>
            <button className="flex flex-col items-center gap-1 p-3 text-slate-400 hover:text-slate-200 transition-colors">
              <span className="text-xl">🏆</span>
              <span className="text-[10px] font-bold uppercase">Ranks</span>
            </button>
            <button 
              onClick={() => user && setAppState('SETTINGS')}
              className={`flex flex-col items-center gap-1 p-3 rounded-[1.5rem] transition-all ${appState === 'SETTINGS' ? 'bg-white/10 text-white' : 'text-slate-400'}`}
            >
              <span className="text-xl">⚙️</span>
              <span className="text-[10px] font-bold uppercase">Settings</span>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default App;
