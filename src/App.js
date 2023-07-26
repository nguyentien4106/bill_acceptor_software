import { useEffect, useState } from 'react';
import './App.css';
import Progress from './components/Progress';
import { ReactNotifications } from 'react-notifications-component'
import { Store } from 'react-notifications-component';

const {ipcRenderer} = window.require('electron')

function App() {

  const [money, setMoney] = useState(0)
  const [background, setBackground] = useState()
  const [appData, setAppData] = useState({})

  useEffect(() => {
    ipcRenderer.on('detectMoneyIn', function (event, data) {
      setMoney(data)
      Store.removeAllNotifications()
      Store.addNotification({
        title: "",
        id: "inputMoney",
        message: `Bạn đã nạp vào ${data.toLocaleString('en-US', {style: 'currency',currency: 'VND'})}`,
        type: "info",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true
        }
      })
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
