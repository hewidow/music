<template>
  <v-snackbar
    v-model="visible"
    :color="$vuetify.theme.themes.light.messBg"
    centered
    :timeout="duration"
    elevation="2"
    width="75%"
    min-width="75%"
    max-width="75%"
  >
    <v-row no-gutters>
      <v-col cols="12" class="text-center justify-center">
        <v-icon color="primaryText" size="36">{{typeIcon[type]}}</v-icon>
      </v-col>
      <v-col cols="12">
        <div class="primaryText--text subtitle-1 text-center">{{message}}</div>
      </v-col>
    </v-row>
  </v-snackbar>
</template>

<script>
export default {
  name: 'Message',
  data () {
    return {
      visible: false,
      type: 'info',
      message: '',
      duration: 3000,
      typeColor: {
        info: '#2196F3',
        error: '#FF5252',
        warning: '#FFC107',
        success: '#4CAF50'
      },
      typeIcon: {
        info: 'mdi-information-outline',
        error: 'mdi-close-circle-outline',
        warning: 'mdi-alert-circle-outline',
        success: 'mdi-check-circle-outline'
      }
    }
  },
  methods: {
    setTimer () {
      setTimeout(() => {
        this.close() // 3000ms之后调用关闭方法
      }, this.duration)
    },
    close () {
      this.visible = false
      setTimeout(() => {
        this.$destroy()
        this.$el.parentNode.removeChild(this.$el) // 从DOM里将这个组件移除
      }, 500)
    }
  },
  mounted () {
    this.setTimer() // 挂载的时候就开始计时，3000ms后消失
  }
}
</script>

<style scoped>

</style>
