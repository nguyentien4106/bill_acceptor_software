const { app, BrowserWindow, ipcMain, Menu, dialog } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const initBillAcceptor = require('../helpers/initBillAcceptor')
 
let mainWindow;
let money = 0;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    }
  });

  mainWindow.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`
  );

  mainWindow.on('closed', function () {
    mainWindow = null;
  });


  mainWindow.webContents.openDevTools();

  var menu = Menu.buildFromTemplate([
    {
        label: 'Menu',
        submenu: [
            {
              label:'Add money',
              click(){
                money += 100000;
                mainWindow.webContents.send('detectMoneyIn', money);
              }
            },
            {
              label:'Print',
              click(){
                money += 100000;
                mainWindow.webContents.send('detectMoneyIn', money);
              }
            },
        ]
    }])

  Menu.setApplicationMenu(menu); 
}

function readBill(result){
  console.log(result)
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
  const contents = mainWindow.webContents;
  contents.getPrintersAsync().then(res => console.log(res))
  initBillAcceptor(readBill)
  ipcMain.on("print", (event, data) => {
    console.log(data)
  })

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
