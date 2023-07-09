const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const SerialPort = require('serialport');
const TpSeries = require('tp-rs232')

let mainWindow;
function initTpBillAcceptor() {
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
  
  tp.on('OPEN', () => {
    console.log('Port opened!');
  });
  
  tp.on('CLOSE', () => {
    console.log('Port closed!');
  });
  
  tp.on('READ_NOTE', (result) => {
    console.log('READ_NOTE');
    console.log(result);
  
    if (result.channel === 2) {
      tp.command('REJECT_BANKNOTE');
    } else {
      tp.command('ACCEPT_BANKNOTE');
    }
  });

  tp.on('STACKING', (result) => {
    console.log(result);
  
  });
  
 
  tp.on('POWER_UP', () => {
    console.log('POWER_UP');
  });
 
  tp.on('BILL_REJECT', () => {
    console.log('BILL_REJECT');
  });
  tp.on('INVALID_COMMAND', () => {
    console.log('INVALID_COMMAND');
  });

  tp.on('ENABLE', (result) => {
    console.log('ENABLE');
    console.log(result);
  });
  tp.on('DISABLE', (result) => {
    console.log('DISABLE');
    console.log(result);
  });
  tp.on('REJECT', () => {
    console.log('REJECT');
  });
  tp.on('COMMAND_NOT_FOUND', () => {
    console.log('COMMAND_NOT_FOUND');
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

}
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`
  );

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', () => {
  createWindow()
  initTpBillAcceptor()
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
