import { ipcRenderer } from 'electron'
import Song from './song'
import albumArt from 'album-art'

export default class {
  constructor (name, artist) {
    this.name = name
    this.artist = artist
    this.url = '/static/img/default-art.png'

    ipcRenderer.send('run', 'find', ['album', this.name, 'albumartist', this.artist], name)
    ipcRenderer.once('response' + name, (event, data) => {
      let songs = []
      for (let id in data.Title) {
        songs.push(new Song(data.Title[id], data.Artist[id]))
      }
      this.songs = songs
    })

    albumArt(this.artist, this.name, 'large', (err, url) => {
      if (err) throw err
      if (url) this.url = url
    })
  }
}
