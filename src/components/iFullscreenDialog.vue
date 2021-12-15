<template>
  <v-dialog
    v-model="showDialog"
    @click:outside="closeDialog"
    transition="scroll-x-reverse-transition"
    scrollable
    fullscreen
  >
    <v-card
      :img="$vuetify.theme.themes.light.backgroundImage"
      rounded="0"
    >
      <v-toolbar
        color="primary"
        elevation="0"
        dense
        height="48"
        min-height="48"
        max-height="48"
      >
        <v-btn
          icon
          @click="closeDialog"
          color="primaryText"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title class="primaryText--text font-weight-bold">{{ appTitle }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="pa-0">
        <slot name="content"></slot>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'iFullscreenDialog',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    appTitle: {
      type: String,
      default: ''
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closeDialog')
    }
  }
}
</script>

<style scoped>
</style>
