import React, { useState, useRef } from 'react';
import axios from 'axios';

interface WheelOfLuckProps {
  options: string[];
}

const WheelOfLuck: React.FC<WheelOfLuckProps> = ({ options }) => {
  const [result, setResult] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  const wheelRef = useRef<SVGGElement>(null);

  const colors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
    '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'
  ];

  const totalOptions = options.length;
  const anglePerOption = 360 / totalOptions;

  const handleSpin = async () => {
    setIsSpinning(true);
    setResult(null);
    setDebugLogs([]);

    try {
      const response = await axios.post('http://localhost:3000/spin');
      const { result: apiResult } = response.data;

      const winningIndex = options.indexOf(apiResult);
      if (winningIndex === -1) {
        throw new Error('Invalid result from API');
      }

      // Calculate rotation
      const currentPosition = rotation % 360;
      const startPositionOfWinningSegment = winningIndex * anglePerOption;
      const rotationNeeded = 360 * 5 - currentPosition + 360 - startPositionOfWinningSegment;
      
      // Subtract a small random extra rotation for unpredictability
      const extraRotation = Math.random() * anglePerOption;
      const totalRotation = rotationNeeded - extraRotation;

      const newRotation = rotation + totalRotation;
      setRotation(newRotation);

      setTimeout(() => {
        setResult(apiResult);
        setIsSpinning(false);
        
        // Set the final rotation to mod 360
        const finalRotation = newRotation % 360;
        setRotation(finalRotation);
        
        const finalSegment = Math.floor(finalRotation / anglePerOption);

      }, 5000);
    } catch (error) {
      console.error('Error spinning the wheel:', error);
      
      setIsSpinning(false);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Wheel of Luck</h2>
      <div style={{ position: 'relative', width: '300px', height: '340px', margin: '0 auto' }}>
        <svg width="300" height="340" viewBox="0 0 300 340">
          {/* External Arrow */}
          <path d="M150,10 L140,30 L160,30 Z" fill="black" transform="rotate(180, 150, 20)" />
          
          {/* Wheel */}
          <g ref={wheelRef} 
             style={{
               transformOrigin: '150px 170px',
               transition: isSpinning ? 'transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none'
             }}
             transform={`rotate(${rotation})`}>
            {options.map((option, index) => {
              const startAngle = index * anglePerOption;
              const endAngle = (index + 1) * anglePerOption;
              const midAngle = (startAngle + endAngle) / 2;
              const largeArcFlag = anglePerOption <= 180 ? 0 : 1;
              
              const startRadians = (startAngle - 90) * Math.PI / 180;
              const endRadians = (endAngle - 90) * Math.PI / 180;
              const midRadians = (midAngle - 90) * Math.PI / 180;
              
              const x1 = 150 + 140 * Math.cos(startRadians);
              const y1 = 170 + 140 * Math.sin(startRadians);
              const x2 = 150 + 140 * Math.cos(endRadians);
              const y2 = 170 + 140 * Math.sin(endRadians);
              
              const textX = 150 + 70 * Math.cos(midRadians);
              const textY = 170 + 70 * Math.sin(midRadians);

              return (
                <g key={index}>
                  <path
                    d={`M150,170 L${x1},${y1} A140,140 0 ${largeArcFlag},1 ${x2},${y2} Z`}
                    fill={colors[index % colors.length]}
                  />
                  <text
                    x={textX}
                    y={textY}
                    fontSize="12"
                    fill="white"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`
                      rotate(${midAngle}, ${textX}, ${textY})
                      rotate(90, ${textX}, ${textY})
                    `}
                  >
                    {option}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
      <button onClick={handleSpin} disabled={isSpinning} style={{ marginTop: '20px', padding: '10px 20px' }}>
        {isSpinning ? 'Spinning...' : 'Spin'}
      </button>
      {result && <p>Result: {result}</p>}
    </div>
  );
};

export default WheelOfLuck;