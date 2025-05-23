import NutritionCalculator from "./components/NutritionCalculator";
import { CalculatorProvider } from "./context/CalculatorContext";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <CalculatorProvider>
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <header className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Nutrition Macro Calculator
            </h1>
            <p className="text-gray-600">
              Calculate your daily calorie and macronutrient targets based on
              your goals
            </p>
          </header>
          <NutritionCalculator />
        </div>
      </CalculatorProvider>

      <a
        href="https://saira-gulamali.mvt.so/macro-tracker"
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-700 transition duration-300"
      >
        Return to Susan Fitness
      </a>
    </div>
  );
}

export default App;
