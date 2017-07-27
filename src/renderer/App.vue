<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import albumArt from 'album-art'
import 'font-awesome/css/font-awesome.css'

export default {
  name: 'mpd',
  mounted () {
    this.$electron.ipcRenderer.on('song', (event, song) => {
      this.$store.commit('setsong', song)
      if (song['Artist'] != null) {
        albumArt(song['Artist'], song['Album'], (err, url) => {
          if (err) {
            console.log('No album art found')
          } else {
            this.$store.commit('setart', url)
          }
        })
      }
    })

    this.$electron.ipcRenderer.on('status', (event, state) => {
      this.$store.commit('setstatus', state)
    })

    this.$electron.ipcRenderer.send('getsong')
    this.$electron.ipcRenderer.send('getstatus')
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
  font-family: $font-family;
  font-weight: $font-weight-light;
  color: #2c3e50;
}

.pull-right {
  float: right;
}

.right {
  text-align: right !important;
}

// Simple grid
$width: 96%;
$gutter: 4%;
$breakpoint-small: 33.75em; // 540px
$breakpoint-med: 45em; // 720px
$breakpoint-large: 60em; // 960px

.container {
  width: 90%;
  margin-left: auto;
  margin-right: auto;

  @media only screen and (min-width: $breakpoint-small) {
    width: 80%;
  }

  @media only screen and (min-width: $breakpoint-large) {
    width: 75%;
    max-width: 60rem;
  }
}

.row {
  position: relative;
  width: 100%;
}

.row-flex {
  position: relative;
  width: 100%;
  display: flex;
}

.col-flex {
  position: relative;
  float: left;
}

.row [class^="col"] {
  float: left;
  margin: 0.5rem 2%;
  min-height: 0.125rem;
}

.row [class$="-r"] {
  float: right;
  margin: 0.5rem 2%;
  min-height: 0.125rem;
}

.row::after {
  content: "";
  display: table;
  clear: both;
}

.col-1,
.col-2,
.col-3,
.col-4,
.col-5,
.col-6,
.col-7,
.col-8,
.col-9,
.col-10,
.col-11,
.col-12 {
  width: $width;
}

.col-1-sm, .col-1-sm-r { width:($width / 12) - ($gutter * 11 / 12); }
.col-2-sm, .col-2-sm-r { width: ($width / 6) - ($gutter * 10 / 12); }
.col-3-sm, .col-3-sm-r { width: ($width / 4) - ($gutter * 9 / 12); }
.col-4-sm, .col-4-sm-r { width: ($width / 3) - ($gutter * 8 / 12); }
.col-5-sm, .col-5-sm-r { width: ($width / (12 / 5)) - ($gutter * 7 / 12); }
.col-6-sm, .col-6-sm-r { width: ($width / 2) - ($gutter * 6 / 12); }
.col-7-sm, .col-7-sm-r { width: ($width / (12 / 7)) - ($gutter * 5 / 12); }
.col-8-sm, .col-8-sm-r { width: ($width / (12 / 8)) - ($gutter * 4 / 12); }
.col-9-sm, .col-9-sm-r { width: ($width / (12 / 9)) - ($gutter * 3 / 12); }
.col-10-sm, .col-10-sm-r { width: ($width / (12 / 10)) - ($gutter * 2 / 12); }
.col-11-sm, .col-11-sm-r { width: ($width / (12 / 11)) - ($gutter * 1 / 12); }
.col-12-sm, .col-12-sm-r { width: $width; }

@media only screen and (min-width: $breakpoint-med) {
  .col-1 { width:($width / 12) - ($gutter * 11 / 12); }
  .col-2 { width: ($width / 6) - ($gutter * 10 / 12); }
  .col-3 { width: ($width / 4) - ($gutter * 9 / 12); }
  .col-4 { width: ($width / 3) - ($gutter * 8 / 12); }
  .col-5 { width: ($width / (12 / 5)) - ($gutter * 7 / 12); }
  .col-6 { width: ($width / 2) - ($gutter * 6 / 12); }
  .col-7 { width: ($width / (12 / 7)) - ($gutter * 5 / 12); }
  .col-8 { width: ($width / (12 / 8)) - ($gutter * 4 / 12); }
  .col-9 { width: ($width / (12 / 9)) - ($gutter * 3 / 12); }
  .col-10 { width: ($width / (12 / 10)) - ($gutter * 2 / 12); }
  .col-11 { width: ($width / (12 / 11)) - ($gutter * 1 / 12); }
  .col-12 { width: $width; }

  .hidden-sm {
    display: block;
  }
}

</style>
