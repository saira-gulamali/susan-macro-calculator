import React, { useEffect, useRef } from 'react';
import { MacroResults } from '../types';

interface MacroChartProps {
  results: MacroResults;
}

const MacroChart: React.FC<MacroChartProps> = ({ results }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set up variables for the pie chart
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;
    
    // Calculate the angles for each section
    const proteinAngle = 2 * Math.PI * results.proteinPercent;
    const fatAngle = 2 * Math.PI * results.fatPercent;
    const carbsAngle = 2 * Math.PI * results.carbsPercent;
    
    // Starting angle
    let startAngle = -0.5 * Math.PI; // Start at the top
    
    // Draw protein section (blue)
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + proteinAngle);
    ctx.closePath();
    ctx.fillStyle = '#3B82F6'; // Blue
    ctx.fill();
    
    // Draw fat section (yellow)
    startAngle += proteinAngle;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + fatAngle);
    ctx.closePath();
    ctx.fillStyle = '#F59E0B'; // Yellow
    ctx.fill();
    
    // Draw carbs section (green)
    startAngle += fatAngle;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + carbsAngle);
    ctx.closePath();
    ctx.fillStyle = '#10B981'; // Green
    ctx.fill();
    
    // Draw inner circle to create a donut chart
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    
    // Draw text in the center
    ctx.fillStyle = '#1F2937';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${results.calories}`, centerX, centerY - 10);
    ctx.font = '14px Arial';
    ctx.fillText('calories', centerX, centerY + 10);
    
  }, [results]);

  return (
    <div className="w-full max-w-xs mx-auto">
      <h3 className="text-lg font-medium text-gray-800 mb-2 text-center">Daily Macro Split</h3>
      <div className="relative">
        <canvas ref={canvasRef} width={250} height={250} className="mx-auto"></canvas>
        <div className="mt-4 grid grid-cols-3 text-center">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mb-1"></div>
            <span className="text-sm text-gray-600">Protein</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mb-1"></div>
            <span className="text-sm text-gray-600">Fat</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mb-1"></div>
            <span className="text-sm text-gray-600">Carbs</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacroChart;