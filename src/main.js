const electron = require('electron');
const proc = require('child_process');
const path = require('path');

const exePath = require.resolve('../libs/dictation-kit/bin/windows/julius.exe');
const mainConfPath = require.resolve('../libs/dictation-kit/main.jconf');
const amdnnConfPath = require.resolve('../libs/dictation-kit/am-dnn.jconf');
const dnnConfPath = require.resolve('../libs/dictation-kit/julius.dnnconf');

const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
 
let mainWindow;
let juliusProcess;

function onReady() {
  juliusProcess = proc.spawn(exePath, [
    '-C', mainConfPath,
    '-C', amdnnConfPath,
    '-demo',
    '-dnnconf', dnnConfPath,
    '-module'
  ], {
    detached: true
  });

  juliusProcess.on('error', (err) => {
    console.log(err);
  });

  createWindow();
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800, 
    height: 160,
    webPreferences: {
      nodeIntegration: false,
      preload: path.resolve(__dirname, './preload.js')
    },
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    hasShadow: true
  });
 
  mainWindow.loadFile('index.html');
 
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}
 
app.on('ready', onReady);
 
app.on('window-all-closed', () => {
  if (juliusProcess) {
    process.kill(juliusProcess.pid);
    juliusProcess = null;
  }

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
