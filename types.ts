
export enum LearningGoal {
  TRAVEL = 'travel',
  SCHOOL = 'school',
  CASUAL = 'casual'
}

export enum SkillType {
  CAPITALS = 'Capitals',
  FLAGS = 'Flags',
  FACTS = 'Country Facts',
  APUSH = 'APUSH',
  APWH = 'AP World History'
}

export interface UserProfile {
  name: string;
  goal: LearningGoal;
  skillInterests: SkillType[];
  practiceFrequency: number; // minutes per day
  minutesPracticedToday: number;
  xp: number;
  streak: number;
  level: number;
  lastActive: string | null;
  unlockedRegions: string[];
  completedApushUnits: string[];
  completedApushQuests: string[]; // Track individual quest IDs like "u1_q1"
  lastLesson?: {
    skill: SkillType;
    unitId?: string;
    questId?: string;
  };
  badges: string[];
  theme: 'light' | 'dark';
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  countryCode?: string; // For flags
}

export interface LessonData {
  title: string;
  intro: string;
  keyFacts: string[];
  quiz: QuizQuestion[];
  skillType: SkillType;
  unitId?: string;
  questId?: string;
}

export type AppState = 'ONBOARDING' | 'DASHBOARD' | 'LESSON' | 'QUIZ' | 'SUMMARY' | 'SUBJECT_PICKER' | 'SETTINGS' | 'APUSH_PATH';
