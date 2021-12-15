<template>
  <v-overlay :value="overlay" :z-index="zIndex" color="tertiary">
    <v-progress-circular
      indeterminate
      size="36"
      color="primaryText"
    ></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  name: 'iOverlay',
  props: {
    overlay: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>

</style>
