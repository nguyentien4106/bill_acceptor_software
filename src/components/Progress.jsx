import React, { useState, useEffect } from 'react'
import StepZilla from "react-stepzilla";
import Step1_SelectBackground from './Step1_SelectBackground';
import Step2_Payment from './Step2_Payment';
import Step3_TakePhoto from './Step3_TakePhoto';
import Step4_SelectFilter from './Step4_SelectFilter';
import Step5_Print from './Step5_Print';
import backgroundBlack from '../images/background/black.jpg'
import backgroundWhite from '../images/background/white.jpg'
import { Store } from 'react-notifications-component';
import Step6_HandlePrint from './Step6_HandlePrint';

export default function Progress(props) {
  const numberPhotoOptions = [2, 4, 6, 8, 10]
  const backgroundsImage = [{ name: 'black', src: backgroundBlack}, { name: 'white', src: backgroundWhite}]

  const [numberPhoto, setNumberPhoto] = useState(2)
  const [background, setBackground] = useState(backgroundsImage[0])
  const [imagesTaken, setImagesTaken] = useState([])
  const [imagesChoosen, setImagesChoosen] = useState([])
  const [imageToPrint, setImageToPrint] = useState(null)

  const getPhotoStrip = (image) => {
    // setImageStrip(image)
  }

  const steps =
    [
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
                                                  onGetPhotoStrip={getPhotoStrip}
                                                />},

      {name: 'Chụp ảnh', component: <Step3_TakePhoto 
                                      onSetImagesTaken={setImagesTaken}
                                    />},

      {name: 'Chọn filter', component: <Step4_SelectFilter 
                                          imagesTaken={imagesTaken} 
                                          background={background.src}
                                          onSetImagesChoosen={setImagesChoosen}
                                          imagesChoosen={imagesChoosen}
                                          onSetImageToPrint={setImageToPrint}
                                        />},

      {name: 'Printing', component: <Step5_Print 
                                      imageToPrint={imageToPrint}
                                      onSetImageToPrint={setImageToPrint}
                                    />},

      {name: 'Printing', component: <Step6_HandlePrint 
                                  imageToPrint={imageToPrint}
                                />},                           
    ]
    
  return (
    <div className='step-progress'>
        <StepZilla 
          steps={steps}
          startAtStep={4} 
          showSteps={false}
          backButtonCls={"button-4"} 
          backButtonText={"Quay lại"} 
          nextButtonText={"Kế tiếp"}
          nextButtonCls={"button-4 checked"}
          onStepChange={() => Store.removeAllNotifications()}
        />
    </div>
  )
}
