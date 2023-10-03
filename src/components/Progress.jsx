import React, { useState, useEffect } from 'react'
import StepZilla from "react-stepzilla";
import Step1_SelectBackground from './Step1_SelectBackground';
import Step2_Payment from './Step2_Payment';
import Step3_TakePhoto from './Step3_TakePhoto';
import Step4_SelectImages from './Step4_SelectImages';
import Step5_SelectFilter from './Step5_SelectFilter';
import print_template_1 from '../images/templates/template1/image_print.png'

import basic_white_option from '../images/screens/step1/basic_white.png';
import basic_black_option  from '../images/screens/step1/basic_black.png';
import sticker_green_option  from '../images/screens/step1/sticker_green.png';
import sticker_orange_option  from '../images/screens/step1/sticker_orange.png';
import sticker_purple_option  from '../images/screens/step1/sticker_purple.png';
import sticker_pink_option  from '../images/screens/step1/sticker_pink.png';

import basic_white_print from '../images/background/basic_white/basic_white.jpg'
import basic_white_left from '../images/background/basic_white/basic_white_left.jpg'
import basic_white_right from '../images/background/basic_white/basic_white_right.jpg'

import basic_black_print from '../images/background/basic_black/basic_black.jpg'
import basic_black_left from '../images/background/basic_black/basic_black_left.jpg'
import basic_black_right from '../images/background/basic_black/basic_black_right.jpg'

import sticker_orange_print from "../images/background/sticker_orange/sticker_orange.png"
import sticker_orange_left from "../images/background/sticker_orange/sticker_orange_left.png"
import sticker_orange_right  from "../images/background/sticker_orange/sticker_orange_right.png"

import { Store } from 'react-notifications-component';
import Step6_HandlePrint from './Step6_HandlePrint';
import Step0_WaitingScreen from './Step0_WaitingScreen';
const {ipcRenderer} = window.require('electron')

export default function Progress(props) {
  const backgroundsImage = [{ name: 'black', src: print_template_1}, { name: 'white', src: print_template_1}]
  const frameOptions = [basic_black_option, basic_white_option, sticker_green_option, sticker_orange_option, sticker_pink_option, sticker_purple_option];
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
      // frame: sticker_green_print,
      // cloud_left: sticker_green_left,
      // cloud_right: sticker_green_right,
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
      // frame: sticker_pink_print,
      // cloud_left: basic_white_left,
      // cloud_right: basic_white_right,
      option: sticker_pink_option
    },
    {
      name: "sticker_purple",
      // frame: basic_white,
      // cloud_left: basic_white_left,
      // cloud_right: basic_white_right,
      option: sticker_purple_option
    }
  ]
  
  const [dataSelected, setDataSelected] = useState(dataFrames[3])
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
                                    />},

      {name: '', component: <Step4_SelectImages
                                          imagesTaken={imagesTaken} 
                                          onSetImagesChoosen={setImagesChoosen}
                                          imagesChoosen={imagesChoosen}
                                          onSetImageToPrint={setImageToPrint}
                                          onSetLog={setLog}
                                          dataSelected={dataSelected}
                                        />},

      {name: '', component: <Step5_SelectFilter
                                      onSetFilter={setFilter}
                                      imageToPrint={imageToPrint}
                                      imagesChoosen={imagesChoosen}
                                      background={background}
                                      onSetImageToPrint={setImageToPrint}
                                      onSetImageToDrive={setImageToDrive}
                                      onSetLog={setLog}
                                      imageToDemo={imageToDemo}
                                      dataSelected={dataSelected}
                                    />},

      {name: '', component: <Step6_HandlePrint 
                                  imageToPrint={imageToPrint}
                                  imagesChoosen={imagesChoosen}
                                  dataSelected={dataSelected}
                                  filter={filter}
                                  onSetLog={setLog}
                                  log={log}
                                />},                           
    ]
    
  return (
    <div className='step-progress'>
        <StepZilla 
          steps={steps}
          startAtStep={3}
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
