import React from 'react';
import WheelOfLuck from './components/WheelOfLuck';

const App: React.FC = () => {
  const options = [
    'Prize 1', 'Prize 2', 'Prize 3', 'Prize 4', 'Prize 5',
    'Prize 6', 'Prize 7', 'Prize 8', 'Prize 9', 'Prize 10'
  ];

  return (
    <div className="App">
      <WheelOfLuck options={options} />
    </div>
  );
};

export default App;