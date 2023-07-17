'use strict';

import React, { Component } from 'react';
import '../css/Step2_Payment.css'
import { Store } from 'react-notifications-component';
import { CashStack } from "react-bootstrap-icons";

export default class Step2_Payment extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            money: props.money,
            numberPhoto: props.numberPhoto,
            error: false
        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.money !== this.props.money) {
          this.setState({
            money: nextProps.money
          });
        }
    }

    isValidated(){
        this.setState({
            error: this.state.money < this.state.numberPhoto * 25000
        })

        const isValid = this.state.money > this.state.numberPhoto * 25000

        if(!isValid){
            Store.removeAllNotifications()
            Store.addNotification({
                title: "",
                id: "invalidMoney",
                message: "Bạn chưa nạp đủ tiền !!! Vui lòng nạp đủ số tiền theo yêu cầu !",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 10000,
                  onScreen: true
                }
              })
        }

        return isValid;
    }

    displayMoney(money){
        return money.toLocaleString('en-US', {
            style: 'currency',
            currency: 'VND',
          });
    }

    render(){
        return (
                <div className='d-flex justify-content-center mt-100'>
                    <div className='payment d-flex flex-column justify-content-center align-items-center align-self-center w-75'>
                        <h1>Vui lòng nạp số tiền theo yêu cầu</h1>
                        <br/>
                        <div className='payment_elements d-flex align-content-around justify-content-between mt-10'>
                            <CashStack size={70} className='p-2'></CashStack>
                            <h2 className='p-2'>Số tiền cần thanh toán là </h2>
                            <h2 className='p-2 ms-auto'>{this.displayMoney(this.state.numberPhoto * 25000)} VND</h2>
                        </div>
                        <br/>
                        <div className='payment_elements d-flex align-content-around justify-content-between mt-4'>
                            <CashStack  size={70} className='p-2'></CashStack>
                            <h2 className='p-2'>Bạn đã nạp </h2>
                            <h2 className='ms-auto p-2'>{this.displayMoney(this.state.money)} VND</h2>
                        </div>
                    </div>
                </div>
        )
    }
}
