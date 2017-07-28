<template lang="pug">
  a.back(@click="back")
    i.fa.fa-chevron-left 
</template>

<style lang="scss">
a.back {
  cursor: pointer;
  font-size: .7em;
  margin-right: .5em;
}
</style>

<script>
export default {
  name: 'back',
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
