import React, { useState } from 'react'
import StepZilla from "react-stepzilla";
import Step1_SelectBackground from './Step1_SelectBackground';
import Step2_Payment from './Step2_Payment';
import Step3_TakePhoto from './Step3_TakePhoto';
import Step4_SelectFilter from './Step4_SelectFilter';
import Step5_Print from './Step5_Print';
import background from '../images/background.jpg'
import white from '../images/white.jpg'
import black from '../images/black.jpg'

export default function Progress() {
  const numberPhotoOptions = [2, 4 ,6]
  const backgroundsUrl = [background, white, black]
  const [numberPhoto, setNumberPhoto] = useState(2)
  const [backgroundUrl, setBackgroundUrl] = useState(backgroundsUrl[0])

  const steps =
    [
      {name: 'Chọn phông nền ảnh', component: <Step1_SelectBackground 
                                                numberPhotoOptions={numberPhotoOptions}
                                                onSetNumberPhoto={numberPhoto => setNumberPhoto(numberPhoto)}
                                                currentNumberPhoto={numberPhoto}
                                                onSetBackgroundUrl={url => setBackgroundUrl(url)}
                                                currentBackgroundUrl={backgroundUrl}
                                              />},
      {name: 'Xác nhận thanh toán', component: <Step2_Payment />},
      {name: 'Chụp ảnh', component: <Step3_TakePhoto />},
      {name: 'Chọn filter', component: <Step4_SelectFilter />},
      {name: 'Printing', component: <Step5_Print />}
    ]
    
  return (
    <div className='step-progress'>
        <StepZilla 
          steps={steps}
          startAtStep={0} 
          backButtonCls={"button-4"} 
          backButtonText={"Quay lại"} 
          nextButtonText={"Kế tiếp"}
          nextButtonCls={"button-4 yellow"}
        />
    </div>
  )
}
