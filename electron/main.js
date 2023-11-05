const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
const writeLog = require('../helpers/writeLog')
const moment = require('moment')
const GoogleService = require("../helpers/google-api-service")
const BillAcceptor = require("../helpers/initBillAcceptor")

let mainWindow;
let workerWindow;
let money = 0;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 1200,
    title: "Photo Box",
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    },
    minimizable: false,
    fullscreen: true,
    autoHideMenuBar: true
  });

  mainWindow.loadURL(!app.isPackaged ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

  mainWindow.on('closed', async function () {
    await BillAcceptor.disableBillAcceptor()
    app.quit()
  });

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

  workerWindow.loadFile('build/worker.html');

  workerWindow.on('closed', function () {
    mainWindow = null;
  });


  if(!app.isPackaged){
    mainWindow.webContents.openDevTools();
    workerWindow.webContents.openDevTools();
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
              }, 
              {
                label:'open devtool',
                click(){
                  mainWindow.webContents.openDevTools();
                }
              }, 
              {
                label:'close devtool',
                click(){
                  mainWindow.webContents.closeDevTools();
                }
              }
          ]
    }])

    Menu.setApplicationMenu(menu); 
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

  GoogleService.getUsers().then(users => {
    mainWindow.webContents.send("authorize", users)
  })

  ipcMain.on('resetMoney', (event) => {
    money = 0;
    mainWindow?.webContents.send('detectMoneyIn', money);
  })
    
  ipcMain.on("print", (event, data) => {
    workerWindow.webContents.send("sendImage", data);
  });

  ipcMain.on("readyPrint", (event, log) => {
    mainWindow.webContents.send("getNotice", "Ảnh đang được in.")
    workerWindow.webContents.print({silent: true}, (success, reason) => {
      if(success){
        writeLog(log + `\nPrint successfully at ${moment()}`)
        setTimeout(() => {
          mainWindow.webContents.send("getNotice", "Ảnh đã được in thành công. Vui lòng nhận ảnh ở ô dưới.")
          mainWindow.webContents.send("finish")
        }, 3000)
      }
      else {
        mainWindow.webContents.send('detectError', reason)
        writeLog(log + `\nPrint failed at ${moment()} because ${reason}`)
      }
    })

    
  });

  ipcMain.on("pushDrive", async (event, params) => {
    const data = JSON.parse(params)
    const resId_cloud_left = await GoogleService.uploadFile(data.name + "_left", data.cloud_left)
    const resId_cloud_right = await GoogleService.uploadFile(data.name + "_right", data.cloud_right)
    mainWindow.webContents.send("getNotice", "Upload ảnh tới Cloud thành công.")

    const links_cloud_left = await GoogleService.generatePublicUrl(resId_cloud_left.id)
    const links_cloud_right = await GoogleService.generatePublicUrl(resId_cloud_right.id)

    mainWindow.webContents.send("getNotice", "Đang tạo QR Code.")
    const jsonData = {
      qrUrl_cloud_left: links_cloud_left.webViewLink,
      qrUrl_cloud_right: links_cloud_right.webViewLink,
      log: data.log,
      imageForPrint: data.imageForPrint
    }
    mainWindow.webContents.send("getLink", JSON.stringify(jsonData))
  })

  ipcMain.on("receiveNotice", (event, notice) => {
    mainWindow.webContents.send("getNotice", notice)
  })
}).catch(console.log);

app.on('window-all-closed', async function () {
  if (process.platform !== 'darwin') {
    await BillAcceptor.disableBillAcceptor()
    app.quit()
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
