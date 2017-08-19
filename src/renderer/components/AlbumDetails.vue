<template lang="pug">
  div
    .container
      .row
        .col-9-sm
          .row
            .col-1-sm
              h1: back
            .col-11-sm
              h1
                | {{ $route.params.album }}
              h2.light {{ $route.params.artist }}
          .songs
            .row.labels
              .col-1-sm Track
              .col-10-sm Title
              .col-1-sm Length
            .row(v-for="song in album.songs").song
              .col-1-sm.ellipsis {{ song.track }}
              .col-10-sm.ellipsis {{ song.title }}
              .col-1-sm {{ timeformat(song.duration) }}
        .col-3-sm
          img(:src="url").coverimg
          .row
            a.btn(@click="play")
              i.fa.fa-play
              |  Play album
</template>

<script>
import Back from './Back'
import Album from '@/album'
import moment from 'moment'

export default {
  name: 'album-details',
  components: { Back },
  data () {
    return {
      url: '/static/img/default-art.png',
      album: new Album(this.$route.params.album, this.$route.params.artist)
    }
  },
  watch: {
    'album.url' () {
      this.url = this.album.url
    }
  },
  methods: {
    timeformat (time) {
      if (typeof time === 'string') {
        time = parseFloat(time)
      }
      return moment(time * 1000).format('mm:ss')
    },
    play () {
      this.album.play()
      this.$store.commit('setcurrent', this.album)
    }
  }
}
</script>

<style lang="scss">
.inline {
  display: inline;
}
.coverimg {
  width: 100%;
  height: 100%;
}
.light {
  font-weight: 300;
}
.labels {
  font-weight: bold;
}
.song {
  line-height: 1.3;
}
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
