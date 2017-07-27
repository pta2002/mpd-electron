<template>
  <top-bar>
    <div class="row">
      <div class="col-2">
        <img :src="art" class="album-bar-thumb">
      </div>
      <div class="col-10"v-if="song != null">
        <h4>{{ song.Title }}</h4>
        <p>By <b>{{ song.Artist }}</b> from <b>{{ song.Album }}</b></p>
      </div>
      <div class="col-10" v-else>
        <h4>Not playing</h4>
        <p>Pick something to play!</p>
      </div>
    </div>
  </top-bar>
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
    }
  }
}
</script>

<style lang="scss">
.album-bar-thumb {
  height: 3em;
}
</style>
