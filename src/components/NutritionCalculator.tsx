import React from 'react';
import CalculatorForm from './CalculatorForm';
import ResultsDisplay from './ResultsDisplay';
import { useCalculator } from '../context/CalculatorContext';

const NutritionCalculator: React.FC = () => {
  const { isCalculated, resetCalculator } = useCalculator();

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300">
      <div className="relative">
        {!isCalculated ? (
          <div className="p-6 md:p-8">
            <CalculatorForm />
          </div>
        ) : (
          <div className="p-6 md:p-8">
            <ResultsDisplay />
            <div className="mt-8 text-center">
              <button
                onClick={resetCalculator}
                className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors duration-200"
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionCalculator;