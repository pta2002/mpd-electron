<template lang="pug">
  top-bar
    .row
      .col-1-sm
        img(:src="art" class="album-bar-thumb")
      .col-8-sm.song
        div(v-if="song != null")
          h4.song {{ song.Title }}
          p.song By <b>{{ song.Artist }}</b> from <b>{{ song.Album }}</b>
        div(v-else)
          h4.song Not playing
          p.song Pick something to play!
      .col-3-sm-r(v-if="song != null")
        .row.center
          a(@click="prev").mixbtn: i.fa.fa-backward
          a(@click="pause" v-if="state == 'play'").mixbtn: i.fa.fa-pause
          a(@click="play" v-if="state != 'play'").mixbtn: i.fa.fa-play
          a(@click="stop" v-if="state != 'stop'").mixbtn: i.fa.fa-stop
          a(@click="next").mixbtn: i.fa.fa-forward
        .row.center
          range-slider(min="0" max="100" v-model="volume")
</template>

<script>
import TopBar from './TopBar'
import RangeSlider from 'vue-range-slider'
import 'vue-range-slider/dist/vue-range-slider.css'

export default {
  name: 'main',
  components: { TopBar, RangeSlider },
  computed: {
    song () {
      return this.$store.state.Mpd.song
    },
    art () {
      return this.$store.state.Mpd.art == null ? '/static/img/default-art.png' : this.$store.state.Mpd.art
    },
    state () {
      return this.$store.state.Mpd.status['state']
    },
    volume: {
      get () {
        return this.$store.state.Mpd.status['volume']
      },
      set (val) {
        this.$electron.ipcRenderer.send('run', 'setvol', [val])
        this.$store.commit('setvol', val)
      }
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
.center {
  text-align: center;
}

.inline {
  display: inline-block;
}
.song {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

$rail-fill-color: #3498db;
@import '~vue-range-slider/dist/vue-range-slider.scss';
</style>
