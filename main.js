const { app, BrowserWindow } = require('electron')
const glob = require('glob')
const path = require('path')

let mainWin

const renderUrl = `http://a2-www.sayabc.com/teacherabc/login.html` // 加载的url(渲染进程)

const config = {
  width: 1380,
  height: 1035,
  webPreferences: {
    contextIsolation: true,
    nodeIntegration: false
  },
  icon: './electron-config/256.ico'
}

function init() {
  requireModule()

  const createWindow = () => {
    mainWin = new BrowserWindow(config)
  
    mainWin.loadURL(renderUrl)
  
    mainWin.on('closed', () => {
      mainWin = null
    })
  
  }

app.on('ready', () => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWin === null) {
    createWindow()
  }
})

}

function requireModule() {
  const files = glob.sync(path.join(__dirname, 'src/main/*.js'))
  files.forEach( (file) => { require(file) })
}

init()
