const electron = require('electron')
// Module to control application life.

const {
  app,
  BrowserWindow,
  Menu,
  MenuItem
} = electron;

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow


function loadHelloWorldWindow() {
  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
}


function loadHashWindow() {
  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'hash.html'),
    protocol: 'file:',
    slashes: true
  }))
}

function loadKeygenWindow() {
  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'keygen.html'),
    protocol: 'file:',
    slashes: true
  }))
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    // Set the initial width to 800px
    width: 800,
    // Set the initial height to 600px
    height: 600,
    // Set the default background color of the window to match the CSS
    // background color of the page, this prevents any white flickering
    backgroundColor: "#D6D8DC",
    // Don't show the window until it's ready, this prevents any white flickering
    show: false
  })

  loadKeygenWindow();

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  addAppMenu();
}

const appMenuTemplate = {
  label: 'Apps',
  visible: true,
  enabled: true,
  submenu: [{
      label: 'Hello World',
      click() {
        console.log('Hello World');
        loadHelloWorldWindow();
      }
    },
    {
      label: 'Hash',
      click() {
        console.log('Hash');
        loadHashWindow();
      }
    },
    {
      label: 'Keygen',
      click() {
        console.log('Keygen');
        loadKeygenWindow();
      }
    }
  ]
};

function addAppMenu() {
  const appMenu = new MenuItem(appMenuTemplate);
  let menu = Menu.getApplicationMenu();
  menu.append(appMenu);
  Menu.setApplicationMenu(menu);
}


// This is the main window create function
let mainWindowCreator = createMainWindow

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', mainWindowCreator)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    mainWindowCreator()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.