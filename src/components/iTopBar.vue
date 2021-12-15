<template>
  <div>
    <v-app-bar
      flat
      color="primary"
      app
    >
      <v-btn
        icon
        @click="$router.back()"
        color="primaryText"
      >
        <v-icon size="24">mdi-arrow-left</v-icon>
      </v-btn>
      <v-app-bar-title class="primaryText--text font-weight-bold">{{ appTitle }}</v-app-bar-title>
      <slot name="titleAppend"></slot>
    </v-app-bar>
    <i-background-image></i-background-image>
    <v-main class="pa-0">
      <slot name="main"></slot>
    </v-main>
  </div>
</template>

<script>
import iBackgroundImage from '@/components/iBackgroundImage'
export default {
  name: 'iTopBar',
  components: {
    iBackgroundImage
  },
  props: {
    appTitle: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>
