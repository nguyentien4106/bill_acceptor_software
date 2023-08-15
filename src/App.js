import { useEffect, useState } from 'react';
import './App.css';
import Progress from './components/Progress';
import { ReactNotifications } from 'react-notifications-component'
import { Store } from 'react-notifications-component';

const {ipcRenderer} = window.require('electron')

function App() {

  const [money, setMoney] = useState(0)
  // const [background, setBackground] = useState()
  // const [appData, setAppData] = useState({})

  useEffect(() => {
    ipcRenderer.on('detectMoneyIn', function (event, data) {
      // const audio = document.getElementById('tingting');
      // audio.play().then(()=> {
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
      // })
    });

    const audio = document.getElementById("click-audio")
    const prev = document.getElementById('prev-button')
    const next = document.getElementById('next-button')

    prev.addEventListener("click", () =>{
      audio.play()
    })

    next.addEventListener("click", () =>{
      audio.play()
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
