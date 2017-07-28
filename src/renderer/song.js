import { ipcRenderer } from 'electron'

export default class {
  constructor (name, artist) {
    this.name = name
    this.artist = artist

    ipcRenderer.send('run', 'find', ['title', this.name], name)
    ipcRenderer.once('response' + name, (event, data) => {
      for (let key in data) {
        this[key.toLocaleLowerCase()] = data[key]
      }
    })
  }
}
