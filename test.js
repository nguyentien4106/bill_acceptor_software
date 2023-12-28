const TpSeries = require('tp-rs232')
const serialPort = require('serialport')
const manufacturer = 'wch.cn'



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


  serialPort.list()
    .then(ports => {
        const port = ports.filter(item => item.manufacturer === manufacturer)[0]
        tp.open(port.path, serialPortConfig)
            .then(() => {
            console.log('GO!!!');
tp.command("DISABLE").then(res => console.log)
        
            tp.command('POWER_UP')
                .then(() => tp.command('ENABLE'))
                .then((result) => {
                console.log(result);
                });
            })
            .catch((error) => {
            console.log(error);
            });
    })
    .catch(err => console.log(err));


  
}

const closeBillAcceptor = () => {
  tp.close()
}

const disableBillAcceptor = () => {
  tp.command("DISABLE").then(res =>{
    closeBillAcceptor()
  }).catch(console.error)
}

initBillAcceptor(() => {})