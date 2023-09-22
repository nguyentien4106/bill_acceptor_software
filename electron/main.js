const { app, BrowserWindow, ipcMain, Menu, dialog } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const initBillAcceptor = require("../helpers/initBillAcceptor");
const writeLog = require("../helpers/writeLog");
const moment = require("moment");
const fs = require("fs");
const os = require("os");

let mainWindow;
let workerWindow;
let money = 0;

function hasRequiredPermissions() {
  const filePath = "electron/key.txt";
  console.log("\n> Checking if the file exists");
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    console.log("File does exist");
  } catch (err) {
    console.error("File does not exist");
    return false;
  }
  //After check the file exist, check the data in that file to grant access
  try {
    const fileData = fs.readFileSync(filePath, "utf8");
    console.log("Data of the file:", fileData);
    // If the data of file is correct, the system will provide user with access
    return fileData == "pass" ? true : false;
  } catch (error) {
    console.error("Not have permission:", error);
    dialog.showErrorBox("Error", "You have not permission!");
    return false;
  }
}

function createWindow() {
  if (!hasRequiredPermissions()) {
    // If permission is not given, show a notification or take another action and stop the app
    app.quit();
    return;
  }
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Photo Box",
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
    // minimizable: false,
    // fullscreen: true,
    // skipTaskbar: true
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  mainWindow.on("closed", function () {
    mainWindow = null;
  });

  mainWindow.webContents.openDevTools();
  mainWindow.focus();

  var menu = Menu.buildFromTemplate([
    {
      label: "Menu",
      submenu: [
        {
          label: "Add 100",
          click() {
            money += 100000;
            mainWindow.webContents.send("detectMoneyIn", money);
          },
        },
        {
          label: "Add 10",
          click() {
            money += 10000;
            mainWindow.webContents.send("detectMoneyIn", money);
          },
        },
        {
          label: "Add 20",
          click() {
            money += 20000;
            mainWindow.webContents.send("detectMoneyIn", money);
          },
        },
      ],
    },
  ]);

  Menu.setApplicationMenu(menu);

  workerWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
    show: false,
  });

  workerWindow.loadFile("public/worker.html");

  workerWindow.on("closed", function () {
    mainWindow = null;
  });

  workerWindow.webContents.openDevTools();
}

function readBill(result) {
  const moneyValueChannel = {
    1: 10000,
    2: 20000,
    3: 50000,
    4: 100000,
    5: 200000,
    6: 500000,
  };
  money += moneyValueChannel[result.channel];
  mainWindow.webContents.send("detectMoneyIn", money);
}

app.whenReady().then(() => {
  createWindow();

  initBillAcceptor(readBill);

  ipcMain.on("resetMoney", (event) => {
    money = 0;
    mainWindow.webContents.send("detectMoneyIn", money);
  });

  ipcMain.on("print", (event, data) => {
    workerWindow.webContents.send("sendImage", data);
  });

  ipcMain.on("readyPrint", (event, log) => {
    workerWindow.webContents.print(
      { silent: true, printBackground: false, deviceName: "" },
      (success, reason) => {
        if (success) {
          mainWindow.webContents.send("finish");
        } else {
          console.log(reason);
        }
      }
    );
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
