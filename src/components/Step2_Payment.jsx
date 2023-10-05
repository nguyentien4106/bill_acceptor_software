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
        <div className='d-flex justify-content-center' id='payment'>
            <div className='require-money'>
                <div className='payment_elements d-flex align-content-around justify-content-between'>
                    <CashStack size={70} className='p-2'></CashStack>
                    <h3 className='p-2 text'>Số tiền cần thanh toán là </h3>
                    <h3 className='p-2 ms-auto text'>{displayMoney(50000)} VND</h3>
                </div>
            </div>
            <div className='active-money'>
                <div className='payment_elements d-flex align-content-around justify-content-between'>
                    <CashStack  size={70} className='p-2'></CashStack>
                    <h3 className='p-2 text'>Bạn đã nạp </h3>
                    <h3 className='ms-auto p-2 text'>{displayMoney(props.money)} VND</h3>
                </div>
            </div>
            <Navigation currentStep={2} jumpToStep={props.jumpToStep} maxStep={6} showBack={true} showNext={false} countdownTime={300}/>
        </div>
    )
}

export default Step2_Payment
