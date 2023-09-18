const TpSeries = require('tp-rs232')

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

const initBillAcceptor = (readBill) => {
  tp.on("READ_NOTE", result => {
      tp.command('ACCEPT_BANKNOTE');
  });

  tp.on('STACKING', result => {
    if(result.channel > 3){
      tp.command('REJECT_BANKNOTE')
    }
    else {
      readBill(result)
    }
  });

  tp.open('COM14', serialPortConfig)
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
}

const closeBillAcceptor = () => {
  tp.close()
}

const disableBillAcceptor = (callback) => {
  tp.command("DISABLE").then(res =>{
    closeBillAcceptor()
    callback()
    console.log(res)
  }).catch(console.log)
}

module.exports = {
  initBillAcceptor: initBillAcceptor,
  closeBillAcceptor: closeBillAcceptor,
  disableBillAcceptor: disableBillAcceptor
}