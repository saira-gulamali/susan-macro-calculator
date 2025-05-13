import React, { createContext, useState, useContext } from 'react';
import { calculateBMR, calculateTDEE, calculateMacros as calculateMacrosUtil } from '../utils/calculatorLogic';
import { UserStats, MacroResults, CalculatorContextType } from '../types';

const defaultUserStats: UserStats = {
  age: 30,
  sex: 'male',
  height: 175, // cm
  weight: 70, // kg
  activityLevel: 'moderate',
  goal: 'maintenance',
  unit: 'metric'
};

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export const CalculatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userStats, setUserStats] = useState<UserStats>(defaultUserStats);
  const [results, setResults] = useState<MacroResults | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);

  const updateUserStats = (stats: Partial<UserStats>) => {
    setUserStats((prev) => ({ ...prev, ...stats }));
  };

  const calculate = () => {
    // Convert imperial to metric if needed
    let weight = userStats.weight;
    let height = userStats.height;
    
    if (userStats.unit === 'imperial') {
      // Convert pounds to kg
      weight = weight * 0.453592;
      // Convert inches to cm
      height = height * 2.54;
    }
    
    const bmr = calculateBMR(weight, height, userStats.age, userStats.sex);
    const tdee = calculateTDEE(bmr, userStats.activityLevel);
    const macros = calculateMacrosUtil(tdee, userStats.goal);
    
    setResults(macros);
    setIsCalculated(true);
  };

  const resetCalculator = () => {
    setIsCalculated(false);
    setResults(null);
  };

  return (
    <CalculatorContext.Provider
      value={{
        userStats,
        updateUserStats,
        results,
        calculateMacros: calculate,
        isCalculated,
        resetCalculator
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = (): CalculatorContextType => {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
};