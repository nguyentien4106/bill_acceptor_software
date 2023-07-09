import React, { useEffect, useState } from 'react'
// import { initBillAcceptor } from '../helpers/helper';

function Payment() {
    const [money, setMoney] = useState(0)
    const [tp, setTp] = useState(null)
    
    useEffect(() => {
        // initBillAcceptor(onReadBill)
    }, [])

    const onReadBill = (tp, bill) => {
        tp.command("ACCEPT_BANKNOTE")
        console.log(bill)
    }

    console.log()
    return (
        <div>
            <p>Need to pay: 100 000 VND</p>
            <p>Your money: {money}</p>
        </div>
    )
}

export default Payment
