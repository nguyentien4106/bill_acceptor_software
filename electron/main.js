const { app, BrowserWindow, ipcMain, Menu, dialog } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
// const initBillAcceptor = require('../helpers/initBillAcceptor')
const writeLog = require('../helpers/writeLog')
const moment = require('moment')
const fs = require('fs')
const os = require('os');
const GoogleService = require("../helpers/google-api-service")
const BillAcceptor = require("../helpers/initBillAcceptor")
// const PhotoHelper = require("../helpers/assignQRCodeIntoPhoto")
// const QRCode = require('qrcode')

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
    // minimizable: false,
    // fullscreen: true,
    // skipTaskbar: true
  });

  mainWindow.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`
  );

  mainWindow.on('closed', function () {
    mainWindow = null;
    BillAcceptor.closeBillAcceptor()
    app.quit();
  });

  if(isDev){
    
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
  }

  workerWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    },
    show: false
  });

  workerWindow.loadFile(`build/worker.html`);

  workerWindow.on('closed', function () {
    mainWindow = null;
  });

  if(isDev){
    workerWindow.webContents.openDevTools();
  }
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
  BillAcceptor.initBillAcceptor(readBill)

  ipcMain.on('resetMoney', (event) => {
    money = 0;
    mainWindow.webContents.send('detectMoneyIn', money);
  })
    
  ipcMain.on("print", (event, data) => {
    workerWindow.webContents.send("sendImage", data);
  });

  ipcMain.on("readyPrint", (event, log) => {
    workerWindow.webContents.print({silent: true}, (success, reason) => {
      if(success){
        mainWindow.webContents.send("finish")
        writeLog(log + `\nPrint successfully at ${moment()}`)
      }
      else{
        console.log(reason)
        writeLog(log + `\nPrint failed at ${moment()}`)
      }
    })
  });

  // data.image base64
  ipcMain.on("pushDrive", (event, params) => {
    const data = JSON.parse(params)

    GoogleService.uploadFile(data.name, data.image).then(res => {
      GoogleService.generatePublicUrl(res.id).then(urlRes => {
        const jsonData = {
          image: data.image,
          qrUrl: urlRes.webViewLink,
          background: data.background,
          imagesChoosen: data.imagesChoosen,
          filter: data.filter,
          log: data.log
        }

        mainWindow.webContents.send("getLink", JSON.stringify(jsonData))
      })
    })
  })

});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    BillAcceptor.closeBillAcceptor()
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
