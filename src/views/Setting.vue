<template>
  <i-top-bar app-title="设置">
    <template v-slot:main>
      <v-list color="rgba(0,0,0,0)">
        <v-list-item @click="openTheme">
          <span class="primaryText--text">更换主题</span>
          <v-spacer></v-spacer>
          <v-icon color="secondaryText">mdi-chevron-right</v-icon>
        </v-list-item>
        <v-list-item>
          <v-btn v-if="$store.state.cookie === null" @click="login" block class="rounded-pill" elevation="0" color="accent">
            <span class="primaryText--text">立即登录</span>
          </v-btn>
          <v-btn v-else @click="logout" block class="rounded-pill" elevation="0" :loading="logoutLoading" :style="{ backgroundColor: $vuetify.theme.themes.light.cardBg }">
            <span class="secondaryText--text">退出登录</span>
          </v-btn>
        </v-list-item>
        <v-list-item></v-list-item>
      </v-list>
    </template>
  </i-top-bar>
</template>

<script>
import { music } from '@/api/music'
import iTopBar from '@/components/iTopBar'
export default {
  name: 'Setting',
  components: {
    iTopBar
  },
  data: () => ({
    logoutLoading: false
  }),
  methods: {
    login () {
      this.$router.push('/music/login')
    },
    logout () {
      this.logoutLoading = true
      music.logout()
        .then((res) => {
          if (res.data.code === 200) {
            this.$store.commit('setCookieProfile', [null, {}])
            this.$message.success('退出成功')
            this.$router.back()
          }
          this.logoutLoading = false
        })
        .catch(() => {
          this.logoutLoading = false
        })
    },
    openTheme () {
      this.$router.push('/music/theme')
    }
  }
}
</script>

<style scoped>

</style>
