const { app, BrowserWindow, ipcMain, Menu, dialog } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const initBillAcceptor = require('../helpers/initBillAcceptor')
const writeLog = require('../helpers/writeLog')
const moment = require('moment')
const fs = require('fs')
const os = require('os');

let mainWindow;
let workerWindow;
let money = 0;


function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Photo Box",
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    },
    movable: false,
    // minimizable: false
    // fullscreen: true,
    // skipTaskbar: true
  });

  mainWindow.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`
  );

  mainWindow.on('closed', function () {
    mainWindow = null;
  });


  mainWindow.webContents.openDevTools();
  mainWindow.focus()

  var menu = Menu.buildFromTemplate([
    {
        label: 'Menu',
        submenu: [
            {
              label:'Add 100',
              click(){
                money += 100000;
                mainWindow.webContents.send('detectMoneyIn', money);
              }
            },
            {
              label:'Add 10',
              click(){
                money += 10000;
                mainWindow.webContents.send('detectMoneyIn', money);
              }
            },
            {
              label:'Add 20',
              click(){
                money += 20000;
                mainWindow.webContents.send('detectMoneyIn', money);
              }
            }
        ]
    }])

  Menu.setApplicationMenu(menu); 

  workerWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    },
  });

  workerWindow.loadFile('public/worker.html');

  workerWindow.on('closed', function () {
    mainWindow = null;
  });

  workerWindow.webContents.openDevTools();
}

function readBill(result){
  const moneyValueChannel = {
    1 : 10000,
    2 : 20000,
    3 : 50000,
    4: 100000,
    5: 200000,
    6: 500000
  }
  money += moneyValueChannel[result.channel]
  mainWindow.webContents.send('detectMoneyIn', money);
}

app.whenReady().then(() => {
  createWindow()
  
  initBillAcceptor(readBill)

  ipcMain.on('resetMoney', (event) => {
    money = 0;
    mainWindow.webContents.send('detectMoneyIn', money);
    
  })
    
  ipcMain.on("print", (event, data) => {
    workerWindow.webContents.send("sendImage", data);
  });

  ipcMain.on("readyPrint", (event, log) => {
    const pdfPath = path.join(os.homedir(), 'Desktop', 'image.pdf')
    // workerWindow.webContents.printToPDF({}).then(data => {
    //   fs.writeFile(pdfPath, data, (error) => {
    //     if (error) {
    //         const failed = log + `\nFailed Printed at ${moment()}`
    //         writeLog(failed)
    //     }
    //     const success = log + `\nSuccess Printed at ${moment()}`
    //     writeLog(success)
    //   })
    //   money = 0;
    //   mainWindow.webContents.send("finish")
    // }).catch(error => {
    //   console.log(`Failed to write PDF to ${pdfPath}: `, error)
    // })
    console.log('print')
    const options = {
      silent: true,
      deviceName: '',
    }
    workerWindow.webContents.print(options, (success, errorType) => {
      if (!success) console.log(errorType)
    })
  });

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
