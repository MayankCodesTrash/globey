
import React from 'react';

export const REGIONS = [
  { id: 'balkans', name: 'The Balkans', icon: '⛰️' },
  { id: 'scandinavia', name: 'Scandinavia', icon: '❄️' },
  { id: 'southeast-asia', name: 'Southeast Asia', icon: '🏝️' },
  { id: 'latin-america', name: 'Latin America', icon: '💃' },
  { id: 'western-africa', name: 'Western Africa', icon: '🦒' },
  { id: 'central-europe', name: 'Central Europe', icon: '🏰' }
];

export const APUSH_UNITS = [
  { id: 'u1', name: 'Unit 1: 1491–1607', description: 'Native American Societies & Early Contact', icon: '🏹' },
  { id: 'u2', name: 'Unit 2: 1607–1754', description: 'Colonial North America & European Rivalries', icon: '⛵' },
  { id: 'u3', name: 'Unit 3: 1754–1800', description: 'Revolution & the New Republic', icon: '📜' },
  { id: 'u4', name: 'Unit 4: 1800–1848', description: 'Expansion, Reform, & Jacksonian Democracy', icon: '🐎' },
  { id: 'u5', name: 'Unit 5: 1844–1877', description: 'Civil War & Reconstruction', icon: '⚔️' },
  { id: 'u6', name: 'Unit 6: 1865–1898', description: 'Gilded Age & Industrialization', icon: '🏭' },
  { id: 'u7', name: 'Unit 7: 1890–1945', description: 'Global Conflicts & the Great Depression', icon: '🪖' },
  { id: 'u8', name: 'Unit 8: 1945–1980', description: 'Cold War & Civil Rights Movement', icon: '❄️' },
  { id: 'u9', name: 'Unit 9: 1980–Present', description: 'Modern America & Global Interdependence', icon: '💻' }
];

// 5 Specific quests per unit to ensure variety and tracking
export const APUSH_QUESTS: Record<string, { id: string, name: string, topic: string }[]> = {
  u1: [
    { id: 'u1_q1', name: 'Indigenous Cultures', topic: 'Diverse Native American societies pre-contact' },
    { id: 'u1_q2', name: 'The New World', topic: 'European exploration motivations (God, Gold, Glory)' },
    { id: 'u1_q3', name: 'The Columbian Exchange', topic: 'Transatlantic exchange of plants, animals, and diseases' },
    { id: 'u1_q4', name: 'Spanish Empire', topic: 'Casta system and encomienda system' },
    { id: 'u1_q5', name: 'Period 1 Mastery', topic: 'Unit 1 comprehensive review' },
  ],
  u2: [
    { id: 'u2_q1', name: 'Early English Colonies', topic: 'Chesapeake vs. New England colonies' },
    { id: 'u2_q2', name: 'Middle & Southern Colonies', topic: 'Diversity in the Middle colonies and plantation South' },
    { id: 'u2_q3', name: 'Colonial Economy', topic: 'Mercantilism and the Triangle Trade' },
    { id: 'u2_q4', name: 'Transatlantic Religion', topic: 'First Great Awakening and Enlightenment' },
    { id: 'u2_q5', name: 'Period 2 Mastery', topic: 'Unit 2 comprehensive review' },
  ],
  u3: [
    { id: 'u3_q1', name: 'Seven Years War', topic: 'Causes and impacts on British-Colonial relations' },
    { id: 'u3_q2', name: 'Road to Revolution', topic: 'Acts of Parliament and colonial resistance' },
    { id: 'u3_q3', name: 'The Revolutionary War', topic: 'Winning the war and the impact of the Enlightenment' },
    { id: 'u3_q4', name: 'The Constitution', topic: 'Articles of Confederation vs. Constitution' },
    { id: 'u3_q5', name: 'The Early Republic', topic: 'Washington and Adams administrations' },
  ],
  u4: [
    { id: 'u4_q1', name: 'The Market Revolution', topic: 'Industrialization and changing gender roles' },
    { id: 'u4_q2', name: 'Jacksonian Democracy', topic: 'Expansion of suffrage and the Trail of Tears' },
    { id: 'u4_q3', name: 'Second Great Awakening', topic: 'Reform movements (Abolition, Temperance, Education)' },
    { id: 'u4_q4', name: 'Manifest Destiny', topic: 'Expansion and the Missouri Compromise' },
    { id: 'u4_q5', name: 'Period 4 Mastery', topic: 'Unit 4 comprehensive review' },
  ],
  u5: [
    { id: 'u5_q1', name: 'Slavery & Sectionalism', topic: 'Failure of compromise (Compromise of 1850, Dred Scott)' },
    { id: 'u5_q2', name: 'The Civil War', topic: 'Military battles and political turning points' },
    { id: 'u5_q3', name: 'Emancipation', topic: 'Impact of the Proclamation and the 13th Amendment' },
    { id: 'u5_q4', name: 'Reconstruction', topic: 'Radical Reconstruction and the 14th/15th Amendments' },
    { id: 'u5_q5', name: 'End of Reconstruction', topic: 'Compromise of 1877 and Jim Crow origins' },
  ],
  u6: [
    { id: 'u6_q1', name: 'The Gilded Age', topic: 'Business leaders and industrial growth' },
    { id: 'u6_q2', name: 'Labor Movements', topic: 'Unions, strikes, and social critiques' },
    { id: 'u6_q3', name: 'The New South', topic: 'Sharecropping and segregation' },
    { id: 'u6_q4', name: 'Urbanization', topic: 'Immigration and the city landscape' },
    { id: 'u6_q5', name: 'Politics of Gilded Age', topic: 'Populism and government corruption' },
  ],
  u7: [
    { id: 'u7_q1', name: 'Progressive Era', topic: 'Muckrakers and political reforms' },
    { id: 'u7_q2', name: 'World War I', topic: 'Causes for US entry and impact on the homefront' },
    { id: 'u7_q3', name: 'The Roaring 20s', topic: 'Jazz Age, Red Scare, and consumerism' },
    { id: 'u7_q4', name: 'The New Deal', topic: 'Great Depression and FDR programs' },
    { id: 'u7_q5', name: 'World War II', topic: 'Mobilization and post-war international role' },
  ],
  u8: [
    { id: 'u8_q1', name: 'The Cold War', topic: 'Containment and nuclear brinkmanship' },
    { id: 'u8_q2', name: 'Civil Rights Movement', topic: 'Legal challenges and grassroots activism' },
    { id: 'u8_q3', name: 'The Great Society', topic: 'LBJ reforms and the Vietnam War' },
    { id: 'u8_q4', name: 'The Counterculture', topic: '1960s social movements and Nixon' },
    { id: 'u8_q5', name: '1970s Crises', topic: 'Watergate, stagflation, and oil embargoes' },
  ],
  u9: [
    { id: 'u9_q1', name: 'Reagan Revolution', topic: 'Rise of conservatism and supply-side economics' },
    { id: 'u9_q2', name: 'End of Cold War', topic: 'Fall of USSR and new global role' },
    { id: 'u9_q3', name: '9/11 and War on Terror', topic: 'Foreign policy changes post-2001' },
    { id: 'u9_q4', name: 'The Digital Age', topic: 'Globalization and technological impact' },
    { id: 'u9_q5', name: 'Modern Challenges', topic: 'Political polarization and environmental issues' },
  ]
};

export const BADGES = [
  { id: 'first_step', name: 'Explorer', icon: '👣', description: 'Complete your first lesson' },
  { id: 'streak_3', name: 'Consistent', icon: '🔥', description: 'Maintain a 3-day streak' },
  { id: 'capital_master', name: 'Chief of State', icon: '🏛️', description: 'Unlock all Balkan capitals' },
  { id: 'flag_expert', name: 'Vexillologist', icon: '🚩', description: 'Perfect score on a Flag quiz' },
  { id: 'historian', name: 'Time Traveler', icon: '⌛', description: 'Complete an AP History Unit' }
];

export const GlobeySVG = ({ className = "w-32 h-32" }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="80" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="4"/>
    <path d="M40 100C40 100 60 70 100 70C140 70 160 100 160 100" stroke="#93C5FD" strokeWidth="8" strokeLinecap="round"/>
    <path d="M40 140C40 140 70 160 100 160C130 160 160 140 160 140" stroke="#60A5FA" strokeWidth="6" strokeLinecap="round"/>
    <circle cx="75" cy="90" r="10" fill="white"/>
    <circle cx="78" cy="88" r="4" fill="black"/>
    <circle cx="125" cy="90" r="10" fill="white"/>
    <circle cx="128" cy="88" r="4" fill="black"/>
    <path d="M80 130C80 130 90 145 120 130" stroke="white" strokeWidth="5" strokeLinecap="round"/>
  </svg>
);
