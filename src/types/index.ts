export type Sex = 'male' | 'female';

export type ActivityLevel = 'minimal' | 'light' | 'moderate' | 'heavy';

export type Goal = 'maintenance' | 'loss-0.25' | 'loss-0.5' | 'gain-0.25' | 'gain-0.5';

export type Unit = 'metric' | 'imperial';

export interface UserStats {
  age: number;
  sex: Sex;
  height: number;
  weight: number;
  activityLevel: ActivityLevel;
  goal: Goal;
  unit: Unit;
}

export interface MacroResults {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  proteinPercent: number;
  fatPercent: number;
  carbsPercent: number;
}

export interface CalculatorContextType {
  userStats: UserStats;
  updateUserStats: (stats: Partial<UserStats>) => void;
  results: MacroResults | null;
  calculateMacros: () => void;
  isCalculated: boolean;
  resetCalculator: () => void;
}