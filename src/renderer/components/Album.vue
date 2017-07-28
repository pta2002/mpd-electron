<template lang="pug">
  .album
    .cover(@click="click" :class="{'selected': active}")
      img(:src="url").coverimg
    .description
      p.name {{ album.name }}
      p.artist {{ album.artist }}
</template>

<script>
export default {
  name: 'album',
  props: {
    album: {},
    active: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return { url: '/static/img/default-art.png' }
  },
  watch: {
    'album.url' () {
      this.url = this.album.url
    }
  },
  methods: {
    click (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss">
.album {
  max-width: 12rem;
  margin: 1rem;
  position: relative;
}
.cover {
  width: 12rem;
  cursor: pointer;

  .coverimg {
    width: 100%;
    height: 100%;
  }
}

.description {
  p {
    font-size: .9rem;
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }

  .name {
    font-weight: 400;
  }
}
</style>
