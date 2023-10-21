import React, { useState } from 'react'
import StepZilla from "react-stepzilla";
import Step1_SelectBackground from './Step1_SelectBackground';
import Step2_Payment from './Step2_Payment';
import Step3_TakePhoto from './Step3_TakePhoto';
import Step4_SelectImages from './Step4_SelectImages';
import Step5_SelectFilter from './Step5_SelectFilter';

import basic_white_option from '../images/screens/step1/basic_white.png';
import basic_black_option  from '../images/screens/step1/basic_black.png';
import sticker_green_option  from '../images/screens/step1/sticker_green.png';
import sticker_orange_option  from '../images/screens/step1/sticker_orange.png';
import sticker_purple_option  from '../images/screens/step1/sticker_purple.png';
import sticker_pink_option  from '../images/screens/step1/sticker_pink.png';

import basic_white_print from '../images/background/basic_white/basic_white.png'
import basic_white_left from '../images/background/basic_white/basic_white_left.png'
import basic_white_right from '../images/background/basic_white/basic_white_right.png'

import basic_black_print from '../images/background/basic_black/basic_black.png'
import basic_black_left from '../images/background/basic_black/basic_black_left.png'
import basic_black_right from '../images/background/basic_black/basic_black_right.png'

import sticker_orange_print from "../images/background/sticker_orange/sticker_orange.png"
import sticker_orange_left from "../images/background/sticker_orange/sticker_orange_left.png"
import sticker_orange_right  from "../images/background/sticker_orange/sticker_orange_right.png"

import sticker_pink_print from "../images/background/sticker_pink/sticker_pink.png"
import sticker_pink_left from "../images/background/sticker_pink/sticker_pink_left.png"
import sticker_pink_right  from "../images/background/sticker_pink/sticker_pink_right.png"

import sticker_green_print from "../images/background/sticker_green/sticker_green.png"
import sticker_green_left from "../images/background/sticker_green/sticker_green_left.png"
import sticker_green_right  from "../images/background/sticker_green/sticker_green_right.png"

import sticker_purple_print from "../images/background/sticker_purple/sticker_purple.png"
import sticker_purple_left from "../images/background/sticker_purple/sticker_purple_left.png"
import sticker_purple_right  from "../images/background/sticker_purple/sticker_purple_right.png"

import { Store } from 'react-notifications-component';
import Step6_HandlePrint from './Step6_HandlePrint';
import Step0_WaitingScreen from './Step0_WaitingScreen';

import demo from '../images/demo.jpg'
import ErrorPage from './ErrorPage';
import Navigation from './Navigation';

const {ipcRenderer} = window.require('electron')

export default function Progress(props) {
  const dataFrames = [
    {
      name: "basic_black",
      frame: basic_black_print,
      cloud_left: basic_black_left,
      cloud_right: basic_black_right,
      option: basic_black_option
    },
    {
      name: "basic_white",
      frame: basic_white_print,
      cloud_left: basic_white_left,
      cloud_right: basic_white_right,
      option: basic_white_option
    },
    {
      name: "sticker_green",
      frame: sticker_green_print,
      cloud_left: sticker_green_left,
      cloud_right: sticker_green_right,
      option: sticker_green_option
    },
    {
      name: "sticker_orange",
      frame: sticker_orange_print,
      cloud_left: sticker_orange_left,
      cloud_right: sticker_orange_right,
      option: sticker_orange_option
    },
    {
      name: "sticker_pink",
      frame: sticker_pink_print,
      cloud_left: sticker_pink_left,
      cloud_right: sticker_pink_right,
      option: sticker_pink_option
    },
    {
      name: "sticker_purple",
      frame: sticker_purple_print,
      cloud_left: sticker_purple_left,
      cloud_right: sticker_purple_right,
      option: sticker_purple_option
    }
  ]
  
  const [dataSelected, setDataSelected] = useState(dataFrames[3])
  const [imagesTaken, setImagesTaken] = useState([]) //useState([demo, demo, demo, demo, demo, demo])
  const [imagesChoosen, setImagesChoosen] =  useState([]) //useState([demo, demo, demo, demo])
  const [filter, setFilter] = useState('origin')
  const [log, setLog] = useState("")
  const [imageForPrint, setImageForPrint] = useState(null)

  const handleOnStepChange = stepIndex => {
    Store.removeAllNotifications()
    
    if(stepIndex === 0){
      ipcRenderer.send("resetMoney")
      setFilter('origin')
      setImagesTaken([])
      setImagesChoosen([])
    }
    
  }
  
  const steps =
  [
      {name: "Screen Saver", component: <Step0_WaitingScreen />},

      {name: 'Chọn phông nền ảnh', component: <Step1_SelectBackground 
                                                dataFrames={dataFrames}
                                                dataSelected={dataSelected}
                                                onSetDataSelected={setDataSelected}
                                              />},
                                              
      {name: 'Xác nhận thanh toán', component: <Step2_Payment
                                                  money={props.money} 
                                                  onSetLog={setLog}
                                                />},

      {name: '', component: <Step3_TakePhoto 
                                        onSetLog={setLog}
                                        onSetImagesTaken={setImagesTaken}
                                        deepAR={props.deepAR}
                                    />},

      {name: '', component: <Step4_SelectImages
                                          imagesTaken={imagesTaken} 
                                          onSetImagesChoosen={setImagesChoosen}
                                          imagesChoosen={imagesChoosen}
                                          onSetLog={setLog}
                                        />},

      {name: '', component: <Step5_SelectFilter
                                      onSetFilter={setFilter}
                                      imagesChoosen={imagesChoosen}
                                      onSetLog={setLog}
                                      dataSelected={dataSelected}
                                      onSetImageForPrint={setImageForPrint}
                                    />},

      {name: '', component: <Step6_HandlePrint 
                                  imagesChoosen={imagesChoosen}
                                  imageForPrint={imageForPrint}
                                  dataSelected={dataSelected}
                                  filter={filter}
                                  onSetLog={setLog}
                                  log={log}
                                />},   
      {
        name: "error", component: <ErrorPage />
      }                
  ]

  return (
    <div className='step-progress'>
        <StepZilla 
          steps={steps}
          showSteps={false}
          backButtonCls={"back-button"} 
          backButtonText={""} 
          nextButtonText={""}
          nextButtonCls={"next-button"}
          onStepChange={stepIndex => handleOnStepChange(stepIndex)}
        />
    </div>
  )
}
