import { useEffect, useState } from 'react';
import './App.css';
import Progress from './components/Progress';
import { ReactNotifications } from 'react-notifications-component'
import { Store } from 'react-notifications-component';
import * as deepar from 'deepar';

const {ipcRenderer} = window.require('electron')

function App() {
  const [money, setMoney] = useState(0)
  const [isAuth, setIsAuth] = useState(true)
  const [user, setUser] = useState('')
  const [users, setUsers] = useState([])
  const [deepAR, setDeepAR] = useState(null)

  ipcRenderer.on("authorize", (event, data) => {
    setUsers(JSON.stringify(data).split(","))
  })

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
    const canvas = document.createElement('canvas');

    const scale = window.devicePixelRatio || 1;

    const width = window.innerWidth > window.innerHeight ? 825 : window.innerWidth
    canvas.width = Math.floor(width * scale);
    canvas.height = Math.floor(825 * 2 / 3);

    canvas.style.maxHeight = 550 + "px";
    canvas.style.maxWidth = width + "px";
    
    deepar.initialize({
      licenseKey: '0f80df803ffd1a58c1ccfb606615e3a429c55801750dd37b536270fc0d62bc95cef3fc376bf4dacb',
      canvas: canvas,
      deeparWasmPath: './deepar-resources/wasm/deepar.wasm',
      additionalOptions: {
        cameraConfig: {
            disableDefaultCamera: true
        }
    }
    }).then(res => {
      setDeepAR(res)
    }).catch(err => {
      console.log('error')
    })
  }, [])

  useEffect(() => {
    if(isAuth){
        const audio = document.getElementById("click-audio")
        const prev = document.getElementById('prev-button')
        const next = document.getElementById('next-button')

        prev.addEventListener("click", () =>{
          audio.play()
        })

        next.addEventListener("click", () =>{
          audio.play()
        })

       
    }
  }, [isAuth])

  const handleSubmit = () => {  
    const auth = users.some(item => JSON.stringify(item) === JSON.stringify(user))
    if(!auth){
      Store.addNotification({
        title: "",
        id: "inputMoney",
        message: `Bạn không sở hữu chương trình hoặc thiết bị này ! Xin hãy liên hệ với chủ qua sđt`,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 10000,
          onScreen: true
        }
      })
    }
    setIsAuth(auth)
  }

  return (
    <div className="App">
      <ReactNotifications/>
      {
        isAuth ? <Progress 
                    money={money}
                    deepAR={deepAR}
                  />
                  : <div>
                      <label>
                        Xin hãy nhập mã đăng ký của bạn 
                        <input style={{"width": 500}} type="text" value={user} onChange={(e) => setUser(e.target.value)}/>
                      </label>
                      <input type="submit" value="Submit" onClick={handleSubmit}/>
                    </div>                    
      }

    </div>
  );
}

export default App;
