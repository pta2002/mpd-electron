<template>
  <top-bar>
    <div v-if="song != null">
      <h4>{{ song.Title }}</h4>
      <p>By <b>{{ song.Artist }}</b> from <b>{{ song.Album }}</b></p>
    </div>
    <div v-else>
      <h4>Not playing</h4>
      <p>Pick something to play!</p>
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
    }
  }
}
</script>
