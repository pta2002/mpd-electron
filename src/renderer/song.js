import { ipcRenderer } from 'electron'

export default class {
  constructor (file) {
    this.file = file

    ipcRenderer.send('run', 'find', ['file', file], file)
    ipcRenderer.once('response' + file, (event, data) => {
      for (let key in data) {
        this[key.toLocaleLowerCase()] = data[key]
      }
    })
  }
}
