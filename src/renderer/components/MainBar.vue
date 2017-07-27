<template lang="pug">
  top-bar
    .row
      .col-9
        .row
          .col-2-sm
            img(:src="art" class="album-bar-thumb")
          .col-10-sm.song
            .wrap
              div(v-if="song != null")
                h4.song {{ song.Title }}
                p.song By <b>{{ song.Artist }}</b> from <b>{{ song.Album }}</b>
              div(v-else)
                h4.song Not playing
                p.song Pick something to play!
        .row
          .col-1-sm
            p {{ timeformat(elapsed) }}
          .col-10-sm
            vue-slider(:min="0" :max="duration" :step="0.01" v-model="elapsed" :tooltip="false" :real-time="false" style="width: 100%")
          .col-1-sm
            p {{ timeformat(duration) }}
      .col-3-sm-r(v-if="song != null")
        .row.center
          a(@click="prev").mixbtn: i.fa.fa-backward
          a(@click="pause" v-if="state == 'play'").mixbtn: i.fa.fa-pause
          a(@click="play" v-if="state != 'play'").mixbtn: i.fa.fa-play
          a(@click="stop" v-if="state != 'stop'").mixbtn: i.fa.fa-stop
          a(@click="next").mixbtn: i.fa.fa-forward
        .row.center
          vue-slider(:min="0" :max="100" :step="1" v-model="volume" :tooltip="false" style="width: 100%")
    .row
</template>

<script>
import TopBar from './TopBar'
import VueSlider from 'vue-range-slider'
import moment from 'moment'

export default {
  name: 'mainbar',
  components: { TopBar, VueSlider },
  data () {
    return { time: new Date().getTime() / 1000 }
  },
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
    },
    elapsed: {
      get () {
        return parseFloat(this.$store.state.Mpd.status['elapsed']) + (this.time - this.$store.state.Mpd.lastupdate)
      },
      set (val) {
        this.$electron.ipcRenderer.send('run', 'seekcur', [val])
      }
    },
    duration () {
      return parseFloat(this.$store.state.Mpd.status['duration'])
    }
  },
  mounted () {
    setInterval(() => {
      if (this.$store.state.Mpd.status['state'] === 'play') {
        this.time += 0.01
      }
    }, 10)
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
    },
    timeformat (time) {
      return moment(time * 1000).format('mm:ss')
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
