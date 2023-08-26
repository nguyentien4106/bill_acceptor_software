import React, { useState, useEffect } from 'react'
import StepZilla from "react-stepzilla";
import Step1_SelectBackground from './Step1_SelectBackground';
import Step2_Payment from './Step2_Payment';
import Step3_TakePhoto from './Step3_TakePhoto';
import Step4_SelectImages from './Step4_SelectImages';
import Step5_SelectFilter from './Step5_SelectFilter';
import backgroundBlack from '../images/background/black46.jpeg'
import backgroundWhite from '../images/background/white46.jpeg'
import { Store } from 'react-notifications-component';
import Step6_HandlePrint from './Step6_HandlePrint';
import Step0_WaitingScreen from './Step0_WaitingScreen';
const {ipcRenderer} = window.require('electron')

export default function Progress(props) {
  const backgroundsImage = [{ name: 'black', src: backgroundBlack}, { name: 'white', src: backgroundWhite}]

  const [background, setBackground] = useState(backgroundsImage[0])
  const [imagesTaken, setImagesTaken] = useState([])
  const [imagesChoosen, setImagesChoosen] = useState([])
  const [imageToPrint, setImageToPrint] = useState(null)
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
    }
    
  }
  
  const steps =
    [
      {name: "Screen Saver", component: <Step0_WaitingScreen />},

      {name: 'Chọn phông nền ảnh', component: <Step1_SelectBackground 
                                                backgroundsImage={backgroundsImage}
                                                onSetBackground={setBackground}
                                                background={background}
                                              />},

      {name: 'Xác nhận thanh toán', component: <Step2_Payment
                                                  money={props.money} 
                                                  onSetLog={setLog}
                                                />},

      {name: 'Chụp ảnh', component: <Step3_TakePhoto 
                                        onSetLog={setLog}
                                        onSetImagesTaken={setImagesTaken}
                                    />},

      {name: 'Chọn filter', component: <Step4_SelectImages
                                          imagesTaken={imagesTaken} 
                                          background={background.src}
                                          onSetImagesChoosen={setImagesChoosen}
                                          imagesChoosen={imagesChoosen}
                                          onSetImageToPrint={setImageToPrint}
                                          onSetImageToDemo={setImageToDemo}
                                          filter={filter}
                                          onSetLog={setLog}
                                        />},

      {name: 'Printing', component: <Step5_SelectFilter 
                                      imageToPrint={imageToPrint}
                                      onSetFilter={setFilter}
                                      imagesChoosen={imagesChoosen}
                                      background={background}
                                      onSetImageToPrint={setImageToPrint}
                                      onSetLog={setLog}
                                      imageToDemo={imageToDemo}
                                    />},

      {name: 'Printing', component: <Step6_HandlePrint 
                                  imageToPrint={imageToPrint}
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
