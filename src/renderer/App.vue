<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'mpd',
  mounted () {
    this.$electron.ipcRenderer.on('song', (event, data) => {
      this.$store.commit('setsong', data)
    })

    this.$electron.ipcRenderer.send('getsong')
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: "Open Sans";
  src: url("/static/fonts/OpenSans-Regular.ttf");
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: "Open Sans";
  src: url("/static/fonts/OpenSans-Bold.ttf");
  font-weight: 700;
}

@font-face {
  font-family: "Open Sans";
  src: url("/static/fonts/OpenSans-Light.ttf");
  font-weight: 300;
}

$font-family: "Open Sans", Helvetica, sans-serif;
$font-weight-light: 300;

* {
  padding: 0;
  margin: 0;
}

body {
  font-family: "Open Sans";
  font-weight: $font-weight-light;
}
</style>
