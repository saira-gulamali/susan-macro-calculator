import React from 'react';
import { useCalculator } from '../context/CalculatorContext';
import MacroChart from './MacroChart';

const ResultsDisplay: React.FC = () => {
  const { results, userStats } = useCalculator();

  if (!results) {
    return null;
  }

  // Helper function to determine goal description
  const getGoalDescription = () => {
    switch (userStats.goal) {
      case 'maintenance':
        return 'maintain your current weight';
      case 'loss-0.25':
        return 'lose 0.25kg per week';
      case 'loss-0.5':
        return 'lose 0.5kg per week';
      case 'gain-0.25':
        return 'gain 0.25kg per week';
      case 'gain-0.5':
        return 'gain 0.5kg per week';
      default:
        return 'reach your goal';
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Your Results</h2>
      
      <div className="bg-emerald-50 p-6 rounded-xl mb-6 text-center">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Daily Calorie Target</h3>
        <p className="text-4xl font-bold text-emerald-600">{results.calories} calories</p>
        <p className="text-gray-600 mt-2">
          To {getGoalDescription()}, you should consume approximately {results.calories} calories per day.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Macronutrient Breakdown</h3>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700">Protein</span>
                <span className="text-gray-900 font-bold">{results.protein}g</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-500 h-2.5 rounded-full" 
                  style={{ width: `${results.proteinPercent * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {Math.round(results.proteinPercent * 100)}% of daily calories
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700">Fat</span>
                <span className="text-gray-900 font-bold">{results.fat}g</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-yellow-500 h-2.5 rounded-full" 
                  style={{ width: `${results.fatPercent * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {Math.round(results.fatPercent * 100)}% of daily calories
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700">Carbohydrates</span>
                <span className="text-gray-900 font-bold">{results.carbs}g</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-500 h-2.5 rounded-full" 
                  style={{ width: `${results.carbsPercent * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {Math.round(results.carbsPercent * 100)}% of daily calories
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center">
          <MacroChart results={results} />
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Understanding Your Results</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span><strong>Protein (4 calories/gram):</strong> Essential for muscle repair and growth. Aim to spread your protein intake throughout the day.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-500 font-bold">•</span>
            <span><strong>Fat (9 calories/gram):</strong> Important for hormone production and vitamin absorption. Focus on healthy sources like avocados, nuts, and olive oil.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 font-bold">•</span>
            <span><strong>Carbohydrates (4 calories/gram):</strong> Your body's primary energy source. Choose complex carbs like whole grains, fruits, and vegetables.</span>
          </li>
        </ul>
        <p className="mt-4 text-gray-600 text-sm">
          These calculations provide an estimate based on the information you provided. Adjust your intake based on your progress and how your body responds. For personalized advice, consult with a registered dietitian.
        </p>
      </div>
    </div>
  );
};

export default ResultsDisplay;