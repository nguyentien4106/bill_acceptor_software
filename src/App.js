import { useEffect, useState } from 'react';
import './App.css';
import Progress from './components/Progress';
import { ReactNotifications } from 'react-notifications-component'
import { Store } from 'react-notifications-component';

const {ipcRenderer} = window.require('electron')

function App() {

  const [money, setMoney] = useState(0)
  const [imageUrls, setImages] = useState([])
  const [background, setBackground] = useState()
  const [appData, setAppData] = useState({})
  const [isPrint, setIsPrint] = useState(false)

  useEffect(() => {
    ipcRenderer.on('detectMoneyIn', function (event, data) {
      console.log('money', data)
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

  useEffect(() => {
    ipcRenderer.send("print", "print")
  }, [isPrint])

 
  return (
    <div className="App">
      <ReactNotifications/>
      <Progress 
        money={money}
      />
      <button onClick={() => setIsPrint(true)}> Print</button>
    </div>
  );
}

export default App;
