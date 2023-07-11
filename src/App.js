import { useEffect, useState } from 'react';
import './App.css';
import Progress from './components/Progress';
const {ipcRenderer} = window.require('electron')

function App() {

  const [money, setMoney] = useState(0)

  useEffect(() => {
    ipcRenderer.on('detectMoneyIn', function (event, data) {
      console.log('money', data)
      setMoney(data)
      
    });
  }, [])

  const onHandleError = (err) => {
    ipcRenderer.send('error', err);
  }

  return (
    <div className="App">
      <Progress money={money} onHandleError={err => onHandleError(err)}></Progress>
    </div>
  );
}

export default App;
