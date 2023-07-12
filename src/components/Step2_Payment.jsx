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
            error: this.state.money < this.state.numberPhoto * 35000
        })
        return this.state.money > this.state.numberPhoto * 35000;
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
                            <h2>Số tiền cần thanh toán là </h2>
                            <h2>{this.displayMoney(this.state.numberPhoto * 35000)} VND</h2>
                        </div>
                        <br/>
                        <div className='payment_elements d-flex align-content-around justify-content-between mt-4'>
                            <h2>Bạn đã nạp </h2>
                            <h2>{this.displayMoney(this.state.money)} VND</h2>
                        </div>

                        {this.state.error && <h2 className='mt-50 red' color='red'>Số tiền đã nạp không đủ</h2>}
                    </div>
                </div>
        )
    }
}
