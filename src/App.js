import { useEffect, useState } from 'react';
import './App.css';
import Progress from './components/Progress';
import { ReactNotifications } from 'react-notifications-component'

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
      <ReactNotifications/>
      <Progress 
        money={money}
      />
    </div>
  );
}

export default App;
