import { useEffect, useState } from 'react';
import './App.css';
import Progress from './components/Progress';
import MyComponent from '../src/components/MyComponent'


const {mergeImages} = window.require('merge-images')
const {ipcRenderer} = window.require('electron')

function App() {

  const [money, setMoney] = useState(0)
  const [imageUrls, setImages] = useState([])

  useEffect(() => {
    ipcRenderer.on('detectMoneyIn', function (event, data) {
      console.log('money', data)
      setMoney(data)
      
    });
    
    // mergeImages([black, white, demo])
    //   .then(b64 => console.log(b64));
   

  }, [])

 
  return (
    <div className="App">
      <MyComponent></MyComponent>
      {/* <Progress money={money}></Progress> */}
    </div>
  );
}

export default App;
