<template>
  <v-dialog
    v-model="showDialog"
    @click:outside="closeDialog"
    content-class="bottom-dialog ma-0 rounded-0 rounded-t-lg"
    transition="dialog-bottom-transition"
    scrollable
  >
    <slot name="content"></slot>
  </v-dialog>
</template>

<script>
export default {
  name: 'iBottomDialog',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    fullscreen: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closeDialog')
    }
  }
}
</script>

<style>
.bottom-dialog{
  position: absolute;
  bottom: 0;
}
</style>
