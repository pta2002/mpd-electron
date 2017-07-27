'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
import mpd from 'mpd'
import mpdHelper from './mpd'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mpdClient
let mainWindow

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  createMpd()
}

function createMpd () {
  mpdClient = mpd.connect({
    port: 6600,
    host: 'localhost'
  })

  mpdClient.on('ready', () => {
    console.log('Connected to MPD')
    mpdClient.sendCommand(mpd.cmd('currentsong', []), (err, msg) => {
      if (err) throw err
      mainWindow.webContents.send('song', mpdHelper.parseMpdResponse(msg))
    })
  })

  mpdClient.on('system', (name) => {
    console.log(name)
    if (name === 'player') {
      mpdClient.sendCommand(mpd.cmd('currentsong', []), (err, msg) => {
        if (err) throw err
        mainWindow.webContents.send('song', mpdHelper.parseMpdResponse(msg))
      })
    }

    if (name === 'mixer' || name === 'player') {
      mpdClient.sendCommand(mpd.cmd('status', []), (err, msg) => {
        if (err) throw err
        mainWindow.webContents.send('status', mpdHelper.parseMpdResponse(msg))
      })
    }
  })

  ipcMain.on('getsong', (event) => {
    mpdClient.sendCommand(mpd.cmd('currentsong', []), (err, msg) => {
      if (err) throw err
      event.sender.send('song', mpdHelper.parseMpdResponse(msg))
    })
  })

  ipcMain.on('getstatus', (event) => {
    mpdClient.sendCommand(mpd.cmd('status', []), (err, msg) => {
      if (err) throw err
      event.sender.send('status', mpdHelper.parseMpdResponse(msg))
    })
  })

  ipcMain.on('run', (event, cmd, args) => {
    mpdClient.sendCommand(mpd.cmd(cmd, args), (err, msg) => {
      if (err) throw err
    })
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
