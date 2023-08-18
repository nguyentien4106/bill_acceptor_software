import React, { Component } from 'react';
import '../css/Step2_Payment.css'
import { CashStack } from "react-bootstrap-icons";
import Navigation from './Navigation';
const {ipcRenderer} = window.require('electron')

export default class Step2_Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            money: props.money,
            showNext: false
        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.money !== this.props.money) {
          this.setState({
            money: nextProps.money
          });
        //   this.setState({
        //     showNext: nextProps.money >= 50000
        //   })
          this.props.onSetLog(prev => prev + `\ninput: ${nextProps.money} VND`)
          if(nextProps.money >= 50000){
            this.props.jumpToStep(3)
          }
        }
    }

    displayMoney(money){
        return money.toLocaleString('en-US', {
            style: 'currency',
            currency: 'VND',
          });
    }

    render(){
        return (
                <div className='d-flex justify-content-center commonBackground' id='payment'>
                    <div className='payment d-flex flex-column justify-content-center align-items-center align-self-center'>
                        <h1>Vui lòng nạp số tiền theo yêu cầu</h1>
                        <br/>
                        <div className='payment_elements d-flex align-content-around justify-content-between mt-10'>
                            <CashStack size={70} className='p-2'></CashStack>
                            <h2 className='p-2'>Số tiền cần thanh toán là </h2>
                            <h2 className='p-2 ms-auto'>{this.displayMoney(50000)} VND</h2>
                        </div>
                        <br/>
                        <div className='payment_elements d-flex align-content-around justify-content-between mt-4'>
                            <CashStack  size={70} className='p-2'></CashStack>
                            <h2 className='p-2'>Bạn đã nạp </h2>
                            <h2 className='ms-auto p-2'>{this.displayMoney(this.state.money)} VND</h2>
                        </div>
                    </div>
                    <Navigation currentStep={2} jumpToStep={this.props.jumpToStep} maxStep={6} showBack={false} showNext={this.state.showNext}/>
                </div>
        )
    }
}
