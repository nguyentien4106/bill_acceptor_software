import React, { useEffect} from 'react'
import { useState } from 'react';
import { CashStack } from "react-bootstrap-icons";
import Navigation from './Navigation';
import '../css/Step2.css'

function Step2_Payment(props) {
    const OneMinute = 60
    const [timer, setTimer] = useState(0)

    useEffect(() => {
        setTimer(prev => 0)
        if(props.money >= 50000){
            props.jumpToStep(3)
        }
    }, [props.money])

    useEffect(() => {
        const intervalId = setInterval(() => {
          setTimer(prevTime => prevTime + 1); 
        }, 1000); 


        return () => clearInterval(intervalId); 
    }, []);

    useEffect(() => {
        if(timer >= OneMinute){
            props.jumpToStep(0)
        }
    }, [timer])

    const displayMoney = (money)=> {
        return money.toLocaleString('en-US', {
            style: 'currency',
            currency: 'VND',
          });
    }

    return (
        <div className='d-flex justify-content-center commonBackground' id='payment'>
            <div className='payment d-flex flex-column justify-content-center align-items-center align-self-center'>
                <h1>Vui lòng nạp số tiền theo yêu cầu</h1>
                <br/>
                <div className='payment_elements d-flex align-content-around justify-content-between mt-10'>
                    <CashStack size={70} className='p-2'></CashStack>
                    <h2 className='p-2'>Số tiền cần thanh toán là </h2>
                    <h2 className='p-2 ms-auto'>{displayMoney(50000)} VND</h2>
                </div>
                <br/>
                <div className='payment_elements d-flex align-content-around justify-content-between mt-4'>
                    <CashStack  size={70} className='p-2'></CashStack>
                    <h2 className='p-2'>Bạn đã nạp </h2>
                    <h2 className='ms-auto p-2'>{displayMoney(props.money)} VND</h2>
                </div>
            </div>
            <Navigation currentStep={2} jumpToStep={props.jumpToStep} maxStep={6} showBack={true} showNext={false} countdownTime={300}/>
        </div>
    )
}

export default Step2_Payment
