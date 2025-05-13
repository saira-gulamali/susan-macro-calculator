import React, { useState } from 'react';
import { useCalculator } from '../context/CalculatorContext';
import { Sex, ActivityLevel, Goal, Unit } from '../types';
import { ArrowRight } from 'lucide-react';

const CalculatorForm: React.FC = () => {
  const { userStats, updateUserStats, calculateMacros } = useCalculator();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'age' || name === 'height' || name === 'weight') {
      updateUserStats({ [name]: parseFloat(value) || 0 });
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'sex') {
      updateUserStats({ sex: value as Sex });
    } else if (name === 'activityLevel') {
      updateUserStats({ activityLevel: value as ActivityLevel });
    } else if (name === 'goal') {
      updateUserStats({ goal: value as Goal });
    } else if (name === 'unit') {
      updateUserStats({ unit: value as Unit });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!userStats.age || userStats.age < 15 || userStats.age > 100) {
      errors.age = 'Age must be between 15 and 100';
    }
    
    if (!userStats.height || userStats.height < (userStats.unit === 'metric' ? 120 : 48) || 
        userStats.height > (userStats.unit === 'metric' ? 250 : 96)) {
      errors.height = userStats.unit === 'metric' 
        ? 'Height must be between 120 and 250 cm' 
        : 'Height must be between 48 and 96 inches';
    }
    
    if (!userStats.weight || userStats.weight < (userStats.unit === 'metric' ? 30 : 66) || 
        userStats.weight > (userStats.unit === 'metric' ? 250 : 550)) {
      errors.weight = userStats.unit === 'metric'
        ? 'Weight must be between 30 and 250 kg'
        : 'Weight must be between 66 and 550 lbs';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      calculateMacros();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Units</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => updateUserStats({ unit: 'metric' })}
                className={`py-2 px-4 text-center rounded-lg transition-colors duration-200 ${
                  userStats.unit === 'metric'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                Metric
              </button>
              <button
                type="button"
                onClick={() => updateUserStats({ unit: 'imperial' })}
                className={`py-2 px-4 text-center rounded-lg transition-colors duration-200 ${
                  userStats.unit === 'imperial'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                Imperial
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="sex" className="block text-sm font-medium text-gray-700 mb-2">Sex</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => updateUserStats({ sex: 'male' })}
                className={`py-2 px-4 text-center rounded-lg transition-colors duration-200 ${
                  userStats.sex === 'male'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                Male
              </button>
              <button
                type="button"
                onClick={() => updateUserStats({ sex: 'female' })}
                className={`py-2 px-4 text-center rounded-lg transition-colors duration-200 ${
                  userStats.sex === 'female'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                Female
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={userStats.age || ''}
                onChange={handleInputChange}
                min="15"
                max="100"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
              {formErrors.age && (
                <p className="mt-1 text-sm text-red-600">{formErrors.age}</p>
              )}
            </div>

            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
                Height ({userStats.unit === 'metric' ? 'cm' : 'inches'})
              </label>
              <input
                type="number"
                id="height"
                name="height"
                value={userStats.height || ''}
                onChange={handleInputChange}
                min={userStats.unit === 'metric' ? 120 : 48}
                max={userStats.unit === 'metric' ? 250 : 96}
                step="0.1"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
              {formErrors.height && (
                <p className="mt-1 text-sm text-red-600">{formErrors.height}</p>
              )}
            </div>

            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                Weight ({userStats.unit === 'metric' ? 'kg' : 'lbs'})
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={userStats.weight || ''}
                onChange={handleInputChange}
                min={userStats.unit === 'metric' ? 30 : 66}
                max={userStats.unit === 'metric' ? 250 : 550}
                step="0.1"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
              {formErrors.weight && (
                <p className="mt-1 text-sm text-red-600">{formErrors.weight}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div>
            <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-700 mb-2">
              Activity Level
            </label>
            <select
              id="activityLevel"
              name="activityLevel"
              value={userStats.activityLevel}
              onChange={handleSelectChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              required
            >
              <option value="minimal">Minimal (little to no exercise)</option>
              <option value="light">Light (exercise 1-3 times/week)</option>
              <option value="moderate">Moderate (exercise 3-5 times/week)</option>
              <option value="heavy">Heavy (intense exercise 6-7 times/week)</option>
            </select>
          </div>

          <div>
            <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-2">
              Goal
            </label>
            <select
              id="goal"
              name="goal"
              value={userStats.goal}
              onChange={handleSelectChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              required
            >
              <option value="maintenance">Maintenance</option>
              <option value="loss-0.25">Lose 0.25kg per week</option>
              <option value="loss-0.5">Lose 0.5kg per week</option>
              <option value="gain-0.25">Gain 0.25kg per week</option>
              <option value="gain-0.5">Gain 0.5kg per week</option>
            </select>
          </div>

          <div className="mt-auto pt-4">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg shadow transition-colors duration-200 flex items-center justify-center gap-2"
            >
              Calculate <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CalculatorForm;