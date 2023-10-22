import React, { useEffect} from 'react'
import { CashStack } from "react-bootstrap-icons";
import Navigation from './Navigation';
import '../css/Step2.css'

function Step2_Payment(props) {

    useEffect(() => {
        if(props.money >= 50000){
            props.jumpToStep(3)
        }
    }, [props.money])

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
            <Navigation currentStep={2} jumpToStep={props.jumpToStep} maxStep={6} showBack={true} showNext={false} countdownTime={120}/>
        </div>
    )
}

export default Step2_Payment
