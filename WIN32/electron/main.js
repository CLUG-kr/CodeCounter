// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, Tray, ipcMain} = require('electron')
var net = require('net')
var net = require('net')
const PORT_MAIN = 54322
// const ElectronTitlebarWindows = require('electron-titlebar-windows')
// const titlebar = new ElectronTitlebarWindows({
//   darMode: false,
//   color: '#ffffff',
//   backgroundColor: '#000000 ',
//   draggable: true,
//   fullscreen: false
// })

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000, 
    height: 700, 
    show: false,
    title : "CodeCounter",
    frame: false,
    resizable: false})

//  titlebar.appendTo()

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  // and load the index.html of the app.
  mainWindow.loadFile('html/login.html')
  // Open the DevTools.
  mainWindow.webContents.openDevTools()
  let appIcon = null
    appIcon = new Tray('html/images/favicon.ico')
    const contextMenu = Menu.buildFromTemplate([
    { label: '코드카운트 중지' },
    { label: '종료' }
  ])

  appIcon.setToolTip('CodeCounter')
  appIcon.setContextMenu(contextMenu)    

  // Conn with EventListener

  var listener = net.createServer(function(client){
    client.on('data', function(data){
      s = data.toString()
      writeData(client, data.toString())
      if (s == 'ping')
        mainWindow.webContents.send('gui', 'ping')
      else if (s.startsWith('editor'))
        mainWindow.webContents.send('editor', s.split(':')[1])
      else if (s.startsWith('title'))
        mainWindow.webContents.send('title', s.split(':')[1])
      else if (s.startsWith('code'))
        mainWindow.webContents.send('code', s.substring(5, s.length))
    })        
  })

  listener.listen(PORT_MAIN, function(){
  })

  function writeData(socket, data){
  var success = !socket.write(data);
  if (!success){
    (function(socket, data){
      socket.once('drain', function(){
        writeData(socket, data);
      });
    })(socket, data);
  }
  }


  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    // titlebar.destroy()
    mainWindow = null

  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {

    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
