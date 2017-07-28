<template lang="pug">
  div
    .container
      h1 Albums
      .album-wrap
        album-el(v-for="(album, i) in albums" :album="album" :key="album.name" :active="selected == i" @click="select(album)")
</template>

<script>
import Album from '@/album'
import AlbumEl from './Album'

export default {
  name: 'albums',
  components: { AlbumEl },
  data () {
    return { albums: [], selected: null }
  },
  mounted () {
    this.$electron.ipcRenderer.send('run', 'list', ['Album', 'group', 'AlbumArtist'])
    this.$electron.ipcRenderer.once('response', (event, data) => {
      for (let id in data.AlbumArtist) {
        this.albums.push(new Album(data.Album[id], data.AlbumArtist[id]))
      }
    })
  },
  methods: {
    select (album) {
      this.$router.push({ name: 'view-album', params: { artist: album.artist, album: album.name } })
    }
  }
}
</script>

<style lang="scss">
.album-wrap {
  display: flex;
  flex-flow: row wrap;
  //justify-content: space-around;
}
</style>
