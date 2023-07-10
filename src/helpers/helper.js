const TpSeries = require('tp-rs232');
const moneyValueChannel = {
  1 : 10000,
  2 : 20000,
  3 : 50000,
  4: 100000,
  5: 200000,
  6: 500000
}

const initBillAcceptor = (readBill) => {
    let money = 0;

    let serialPortConfig = {
      baudrate: 9600,
      databits: 8,
      stopbits: 1,
      parity: 'even'
    };
    
    let tp = new TpSeries({
      debug: false,
      timeout: 5000
    });
    
    tp.on("READ_NOTE", (result) => {
      readBill(tp, result)
      console.log(tp)
    });

    tp.open('COM4', serialPortConfig)
      .then(() => {
        console.log('GO!!!');
    
        tp.command('POWER_UP')
          .then(() => tp.command('ENABLE'))
          .then((result) => {
            console.log(result);
          });
      })
      .catch((error) => {
        console.log(error);
      });

    return tp
}

class BillAcceptor {
  constructor(){
    this.money = 0
    this.tp = initBillAcceptor(this.readBill)
  }

  readBill(tp, result){
    console.log("READ_NOTE", result);
    this.money += moneyValueChannel[result.channel]
    tp.command("ACCEPT_BANKNOTE")
  }

  getMoney(){
    return this.money;
  }

}
module.exports = {
  BillAcceptor: BillAcceptor
}