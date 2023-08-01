import React, { useState, useEffect } from 'react'
import StepZilla from "react-stepzilla";
import Step1_SelectBackground from './Step1_SelectBackground';
import Step2_Payment from './Step2_Payment';
import Step3_TakePhoto from './Step3_TakePhoto';
import Step4_SelectImages from './Step4_SelectImages';
import Step5_SelectFilter from './Step5_SelectFilter';
import backgroundBlack from '../images/background/black.jpg'
import backgroundWhite from '../images/background/white.jpg'
import { Store } from 'react-notifications-component';
import Step6_HandlePrint from './Step6_HandlePrint';
import Step3_TakeCamera from './Step3_TakeCamera';
import Step0_WaitingScreen from './Step0_WaitingScreen';
import { drawImagesOnCanvas } from '../helpers/createPhotoStrip';
const {ipcRenderer} = window.require('electron')

export default function Progress(props) {
  const numberPhotoOptions = [2, 4, 6, 8, 10]
  const backgroundsImage = [{ name: 'black', src: backgroundBlack}, { name: 'white', src: backgroundWhite}]

  const [numberPhoto, setNumberPhoto] = useState(2)
  const [background, setBackground] = useState(backgroundsImage[0])
  const [imagesTaken, setImagesTaken] = useState([])
  const [imagesChoosen, setImagesChoosen] = useState([])
  const [imageToPrint, setImageToPrint] = useState(null)
  const [filter, setFilter] = useState('origin')

  const handleOnStepChange = stepIndex => {
    Store.removeAllNotifications()

    if(stepIndex === 0){
      ipcRenderer.send("resetMoney")
      setFilter(null)
      setImageToPrint(null)
      setImagesTaken(null)
    }
    
  }

  useEffect(() => {
    if(imagesChoosen.length === 4){
      drawImagesOnCanvas(imagesChoosen, 500, 1200, props.background, filter).then(photo => {
        setImageToPrint(photo)
      })
    }
  }, [imagesChoosen.length, filter])
  
  const steps =
    [
      {name: "Screen Saver", component: <Step0_WaitingScreen />},

      {name: 'Chọn phông nền ảnh', component: <Step1_SelectBackground 
                                                numberPhotoOptions={numberPhotoOptions}
                                                onSetNumberPhoto={setNumberPhoto}
                                                currentNumberPhoto={numberPhoto}
                                                backgroundsImage={backgroundsImage}
                                                onSetBackground={setBackground}
                                                background={background}
                                              />},

      {name: 'Xác nhận thanh toán', component: <Step2_Payment 
                                                  money={props.money} 
                                                  numberPhoto={numberPhoto}
                                                />},

      {name: 'Chụp ảnh', component: <Step3_TakePhoto 
                                            onSetImagesTaken={setImagesTaken}
                                          />},

      {name: 'Chọn filter', component: <Step4_SelectImages
                                          imagesTaken={imagesTaken} 
                                          background={background.src}
                                          onSetImagesChoosen={setImagesChoosen}
                                          imagesChoosen={imagesChoosen}
                                          onSetImageToPrint={setImageToPrint}
                                          filter={filter}
                                        />},

      {name: 'Printing', component: <Step5_SelectFilter 
                                      imageToPrint={imageToPrint}
                                      onSetFilter={setFilter}
                                      imagesChoosen={imagesChoosen}
                                      onSetImageToPrint={setImageToPrint}

                                    />},

      {name: 'Printing', component: <Step6_HandlePrint 
                                  imageToPrint={imageToPrint}
                                  filter={filter}
                                />},                           
    ]
    
  return (
    <div className='step-progress'>
        <StepZilla 
          steps={steps}
          // startAtStep={6} 
          showSteps={false}
          backButtonCls={"button-4 checked"} 
          backButtonText={"Quay lại"} 
          nextButtonText={"Kế tiếp"}
          nextButtonCls={"button-4 checked"}
          onStepChange={stepIndex => handleOnStepChange(stepIndex)}
        />
    </div>
  )
}
