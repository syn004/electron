const { app, Menu, MenuItem, ipcMain } = require('electron')

let reloadMenu = {
  label: 'Reload', 
  click: (item, focusedWindow) => { 
    focusedWindow.reload()
  }
}

let devMenu = {
  label: 'OpenDevTool', 
  click: (item, focusedWindow) => { 
    focusedWindow.webContents.openDevTools()
  }
}

let menu = new Menu()
menu.append(new MenuItem(reloadMenu))
menu.append(new MenuItem(devMenu))

app.on('browser-window-created', (event, win) => {
  win.webContents.on('context-menu', (e, params) => {
    menu.popup(win, params.x, params.y)
  })
})

ipcMain.on('show-context-menu', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  menu.popup(win)
})