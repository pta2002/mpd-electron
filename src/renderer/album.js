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
      console.log(data)
      for (let id in data.file) {
        songs.push(new Song(data.file[id]))
      }
      this.songs = songs
    })

    albumArt(this.artist, this.name, 'large', (err, url) => {
      if (err) throw err
      if (url) this.url = url
    })
  }

  play () {
    ipcRenderer.send('run', 'clear', [])
    this.songs.forEach((song) => {
      ipcRenderer.send('run', 'add', [song.file])
    })
    ipcRenderer.send('run', 'play', [0])
  }
}
