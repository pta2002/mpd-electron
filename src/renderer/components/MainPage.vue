<template lang="pug">
  top-bar
    .row
      .col      
        img(:src="art" class="album-bar-thumb")
      .col(v-if="song != null")
        h4 {{ song.Title }}
        p By <b>{{ song.Artist }}</b> from <b>{{ song.Album }}</b>
      .col(v-else)
        h4 Not playing
        p Pick something to play!
      .col-r(v-if="song != null")
        .row
          a(@click="prev").mixbtn: i.fa.fa-backward
          a(@click="pause" v-if="state == 'play'").mixbtn: i.fa.fa-pause
          a(@click="play" v-if="state != 'play'").mixbtn: i.fa.fa-play
          a(@click="stop" v-if="state != 'stop'").mixbtn: i.fa.fa-stop
          a(@click="next").mixbtn: i.fa.fa-forward
</template>

<script>
import TopBar from './TopBar'
export default {
  name: 'main',
  components: { TopBar },
  computed: {
    song () {
      return this.$store.state.Mpd.song
    },
    art () {
      return this.$store.state.Mpd.art == null ? '/static/img/default-art.png' : this.$store.state.Mpd.art
    },
    state () {
      return this.$store.state.Mpd.status['state']
    }
  },
  methods: {
    pause () {
      this.$electron.ipcRenderer.send('run', 'pause', [])
    },
    stop () {
      this.$electron.ipcRenderer.send('run', 'stop', [])
    },
    play () {
      this.$electron.ipcRenderer.send('run', 'play', [])
    },
    prev () {
      this.$electron.ipcRenderer.send('run', 'previous', [])
    },
    next () {
      this.$electron.ipcRenderer.send('run', 'next', [])
    }
  }
}
</script>

<style lang="scss">
.album-bar-thumb {
  height: 3em;
}
.mixbtn {
  margin: 0 0.5em;
  cursor: pointer;
  color: #34495e;
}
</style>
