import React, { useState, useEffect } from 'react'
import StepZilla from "react-stepzilla";
import Step1_SelectBackground from './Step1_SelectBackground';
import Step2_Payment from './Step2_Payment';
import Step3_TakePhoto from './Step3_TakePhoto';
import Step4_SelectImages from './Step4_SelectImages';
import Step5_SelectFilter from './Step5_SelectFilter';
import print_template_1 from '../images/templates/template1/image_print.png'

import basic_white from '../images/screens/step1/basic_white.png';
import basic_black from '../images/screens/step1/basic_black.png';
import sticker_green from '../images/screens/step1/sticker_green.png';
import sticker_orange from '../images/screens/step1/sticker_orange.png';
import sticker_purple from '../images/screens/step1/sticker_purple.png';
import sticker_pink from '../images/screens/step1/sticker_pink.png';

import basic_white_print from '../images/background/basic_white/basic_white.jpg'
import basic_white_left from '../images/background/basic_white/basic_white_left.jpg'
import basic_white_right from '../images/background/basic_white/basic_white_right.jpg'

import basic_black_print from '../images/background/basic_black/basic_black.jpg'
import basic_black_left from '../images/background/basic_black/basic_black_left.jpg'
import basic_black_right from '../images/background/basic_black/basic_black_right.jpg'

import { Store } from 'react-notifications-component';
import Step6_HandlePrint from './Step6_HandlePrint';
import Step0_WaitingScreen from './Step0_WaitingScreen';
const {ipcRenderer} = window.require('electron')

export default function Progress(props) {
  const backgroundsImage = [{ name: 'black', src: print_template_1}, { name: 'white', src: print_template_1}]
  const frameOptions = [basic_black, basic_white, sticker_green, sticker_orange, sticker_pink, sticker_purple];
  const dataFrames = [
    {
      name: "basic_white",
      frame: basic_white,
    }
  ]

  const [background, setBackground] = useState(backgroundsImage[0])
  const [imagesTaken, setImagesTaken] = useState([])
  const [imagesChoosen, setImagesChoosen] = useState([])
  const [imageToPrint, setImageToPrint] = useState(null)
  const [imageToDrive, setImageToDrive] = useState(null)
  const [imageToDemo, setImageToDemo] = useState(null)
  const [filter, setFilter] = useState('origin')
  const [log, setLog] = useState("")

  const handleOnStepChange = stepIndex => {
    Store.removeAllNotifications()
    
    if(stepIndex === 0){
      ipcRenderer.send("resetMoney")
      setFilter('origin')
      setImageToPrint(null)
      setImagesTaken([])
      setImagesChoosen([])
      setImageToDemo(null)
      setImageToDrive(null)
    }
    
  }
  
  const steps =
    [
      {name: "Screen Saver", component: <Step0_WaitingScreen />},

      {name: 'Chọn phông nền ảnh', component: <Step1_SelectBackground 
                                                backgroundsImage={backgroundsImage}
                                                onSetBackground={setBackground}
                                                background={background}
                                                frameOptions={frameOptions}
                                              />},
                                              
      {name: 'Xác nhận thanh toán', component: <Step2_Payment
                                                  money={props.money} 
                                                  onSetLog={setLog}
                                                />},

      {name: '', component: <Step3_TakePhoto 
                                        onSetLog={setLog}
                                        onSetImagesTaken={setImagesTaken}
                                    />},

      {name: '', component: <Step4_SelectImages
                                          imagesTaken={imagesTaken} 
                                          background={background}
                                          onSetImagesChoosen={setImagesChoosen}
                                          imagesChoosen={imagesChoosen}
                                          onSetImageToPrint={setImageToPrint}
                                          onSetImageToDemo={setImageToDemo}
                                          filter={filter}
                                          onSetLog={setLog}
                                        />},

      {name: '', component: <Step5_SelectFilter 
                                      imageToPrint={imageToPrint}
                                      imageToDrive={imageToDrive}
                                      onSetFilter={setFilter}
                                      imagesChoosen={imagesChoosen}
                                      background={background}
                                      onSetImageToPrint={setImageToPrint}
                                      onSetImageToDrive={setImageToDrive}
                                      onSetLog={setLog}
                                      imageToDemo={imageToDemo}
                                    />},

      {name: '', component: <Step6_HandlePrint 
                                  imageToPrint={imageToPrint}
                                  imagesChoosen={imagesChoosen}
                                  background={background}
                                  filter={filter}
                                  onSetLog={setLog}
                                  log={log}
                                />},                           
    ]
    
  return (
    <div className='step-progress'>
        <StepZilla 
          steps={steps}
          // startAtStep={5} 
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
