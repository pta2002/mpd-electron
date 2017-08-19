import { ipcRenderer } from 'electron'
import Song from '@/song'

export default class {
  constructor (store) {
    this.store = store
  }

  getCurrentSong () {
    return new Promise((resolve, reject) => {
      this.runMPDCommand('currentsong').then((data) => {
        if (Object.keys(data).length === 0) {
          reject(new Error('playlist empty'))
        }
        resolve(new Song(data.file))
      })
    })
  }

  runMPDCommand (command, args = []) {
    return new Promise((resolve, reject) => {
      let id = Math.floor(Math.random() * 10000)

      ipcRenderer.send('run', command, args, id)
      ipcRenderer.once('response' + id, (event, data) => {
        resolve(data)
      })
    })
  }
}
