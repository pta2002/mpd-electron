<template lang="pug">
  .bar
    slot
</template>

<script>
export default {
  name: 'topbar'
}
</script>

<style lang="scss">
.bar {
  background: #ecf0f1;
  padding: 0.25em;
}
</style>
