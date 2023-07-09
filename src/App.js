import { useState } from 'react';
import './App.css';
import Payment from './components/Payment';

function App() {

  const [completed, setCompleted] = useState(0)


  return (
    <div className="App">
      <button onClick={() => setCompleted(prev => prev < 100 ? prev + 20 : prev)}>Increament</button>
      <Payment></Payment>
    </div>
  );
}

export default App;
