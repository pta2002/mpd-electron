<template lang="pug">
  .container
    h1 Albums
    ul
      li(v-for="song in songs") {{ song.name }} - {{ song.artist }}
</template>

<script>
import Song from '@/song'
export default {
  name: 'albums',
  data () {
    return { songs: [] }
  },
  mounted () {
    this.$electron.ipcRenderer.send('run', 'list', ['Title', 'group', 'Artist'])
    this.$electron.ipcRenderer.once('response', (event, data) => {
      for (let id in data.Artist) {
        this.songs.push(new Song(data.Title[id], data.Artist[id]))
      }
    })
  }
}
</script>
