'use strict';

import React, { Component } from 'react';
import '../css/Step2_Payment.css'

export default class Step2_Payment extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            money: props.money,
            numberPhoto: props.numberPhoto,
            error: false
        }
        // this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms
    
        // this.validationCheck = this.validationCheck.bind(this);
        // this.isValidated = this.isValidated.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.money !== this.props.money) {
          this.setState({
            money: nextProps.money
          });
        }
    }

    isValidated(){
        console.log('money', this.state.money)
        console.log('amount', this.state.numberPhoto * 35000)
        this.setState({
            error: this.state.money < this.state.numberPhoto * 35000
        })
        return this.state.money > this.state.numberPhoto * 35000;
    }

    render(){
        return (
                <div className='d-flex justify-content-center'>
                    <div className='payment d-flex flex-column justify-content-center align-items-center align-self-center'>
                    <h1>Vui lòng nạp số tiền theo yêu cầu</h1>
                    <br/>
                    <div className='payment_elements d-flex align-content-around justify-content-between'>
                        <h2>Số tiền cần thanh toán là </h2>
                        <h2>{this.state.numberPhoto * 35000} VND</h2>
                    </div>
                    <br/>
                    <div className='payment_elements d-flex align-content-around justify-content-between'>
                        <h2>Bạn đã nạp </h2>
                        <h2>{this.state.money} VND</h2>
                    </div>
                    {
                        this.state.error && <h2>Số tiền đã nạp không đủ</h2>
                    }
                </div>
                </div>
        )
    }
    // const renderAmount = () => {
    //     return (
    //         <div>Số tiền cần thanh toán là: {35000*numberPhoto}</div>
    //     )
    // }

    // const renderMoneyIn = () => {
    //     return (
    //         <div>Bạn đã nạp: {money} VND</div>
    //     )
    // }

    // const isValidated = () => {
    //     return money >= 35000*numberPhoto;
    // }

    // return (
    //     <div className='payment'>
    //         <h1>Vui lòng nạp số tiền theo yêu cầu</h1>
    //         <div className='payment__mandatory'>
    //             <h1>{renderAmount()}</h1>
    //         </div>
    //         <div className='payment__putted'>
    //             <h1>{renderMoneyIn()}</h1>
    //         </div>
    //     </div>
    // )
}
