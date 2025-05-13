import { Sex, ActivityLevel, Goal, MacroResults } from '../types';

// Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
export const calculateBMR = (weight: number, height: number, age: number, sex: Sex): number => {
  if (sex === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
};

// Calculate Total Daily Energy Expenditure (TDEE)
export const calculateTDEE = (bmr: number, activityLevel: ActivityLevel): number => {
  const activityMultipliers = {
    minimal: 1.2, // Little to no exercise
    light: 1.375, // Light exercise 1-3 times/week
    moderate: 1.55, // Moderate exercise 3-5 times/week
    heavy: 1.725 // Heavy exercise 6-7 times/week
  };

  return Math.round(bmr * activityMultipliers[activityLevel]);
};

// Calculate daily calories based on goal
export const calculateCaloriesWithGoal = (tdee: number, goal: Goal): number => {
  const goalAdjustments = {
    'maintenance': 0,
    'loss-0.25': -250, // 0.25kg loss per week (roughly 250 cal deficit)
    'loss-0.5': -500, // 0.5kg loss per week (roughly 500 cal deficit)
    'gain-0.25': 250, // 0.25kg gain per week (roughly 250 cal surplus)
    'gain-0.5': 500 // 0.5kg gain per week (roughly 500 cal surplus)
  };

  return Math.round(tdee + goalAdjustments[goal]);
};

// Calculate macronutrients (protein, fat, carbs) based on calories
export const calculateMacros = (tdee: number, goal: Goal): MacroResults => {
  const dailyCalories = calculateCaloriesWithGoal(tdee, goal);
  
  // Adjust macro ratios based on goal
  let proteinPercent, fatPercent, carbsPercent;
  
  if (goal.includes('loss')) {
    // Higher protein, moderate fat, lower carbs for weight loss
    proteinPercent = 0.3; // 30%
    fatPercent = 0.35; // 35%
    carbsPercent = 0.35; // 35%
  } else if (goal.includes('gain')) {
    // Higher carbs, moderate protein, moderate fat for weight gain
    proteinPercent = 0.25; // 25%
    fatPercent = 0.25; // 25%
    carbsPercent = 0.5; // 50%
  } else {
    // Balanced for maintenance
    proteinPercent = 0.25; // 25%
    fatPercent = 0.3; // 30%
    carbsPercent = 0.45; // 45%
  }
  
  // Calculate grams - Protein: 4 cal/g, Fat: 9 cal/g, Carbs: 4 cal/g
  const proteinCalories = dailyCalories * proteinPercent;
  const fatCalories = dailyCalories * fatPercent;
  const carbsCalories = dailyCalories * carbsPercent;
  
  const protein = Math.round(proteinCalories / 4);
  const fat = Math.round(fatCalories / 9);
  const carbs = Math.round(carbsCalories / 4);
  
  return {
    calories: dailyCalories,
    protein,
    fat,
    carbs,
    proteinPercent,
    fatPercent,
    carbsPercent
  };
};