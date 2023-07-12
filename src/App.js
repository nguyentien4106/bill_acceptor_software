import { useEffect, useState } from 'react';
import './App.css';
import Progress from './components/Progress';
import MyComponent from '../src/components/MyComponent'
const {ipcRenderer} = window.require('electron')

function App() {

  const [money, setMoney] = useState(0)
  const [imageUrls, setImages] = useState([])
  const [background, setBackground] = useState()
  const [appData, setAppData] = useState({})

  useEffect(() => {
    ipcRenderer.on('detectMoneyIn', function (event, data) {
      console.log('money', data)
      setMoney(data)
      
    });

    setAppData({
      money: money,

    })
  }, [])

 
  return (
    <div className="App">
      <Progress 
        money={money}
      />
    </div>
  );
}

export default App;
