<template>
  <div>
    <v-app-bar
      flat
      color="white"
      app
    >
      <v-btn
        icon
        @click="$router.back()"
        color="black"
      >
        <v-icon size="24">mdi-arrow-left</v-icon>
      </v-btn>
      <v-app-bar-title class="black--text font-weight-bold">网易云登录</v-app-bar-title>
    </v-app-bar>
    <v-main class="pa-0">
      <v-form ref="loginFormRef">
        <v-card flat color="white">
          <v-card-text>
            <v-col>
              <v-text-field
                placeholder="请输入手机号"
                color="black"
                background-color="white"
                v-model="phone"
                :rules="[() => (/^1[0-9]{10}$/).test(phone) || '手机号不正确']"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                placeholder="请输入密码"
                color="black"
                background-color="white"
                v-model="password"
                type="password"
              >
<!--                <template v-slot:append>
                  <span @click="sendCaptcha" v-if="loginState === 0" class="blue&#45;&#45;text text&#45;&#45;darken-1">
                    发送验证码
                  </span>
                  <span>
                    <v-progress-circular
                      indeterminate
                      color="accent"
                      size="24"
                      v-if="loginState === 1"
                    ></v-progress-circular>
                  </span>
                  <span v-if="loginState === 2" class="black">{{timeCount}} s后重发</span>
                </template>-->
              </v-text-field>
            </v-col>
          </v-card-text>
          <v-card-actions>
            <v-btn block large color="accent" class="rounded-pill" elevation="0" @click="login" :loading="loginState === 1">
              <span class="primaryText--text">登录</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-main>
  </div>
</template>

<script>
import { music } from '@/api/music'

export default {
  name: 'Login',
  data: () => ({
    loginState: 0,
    timeCount: 60,
    timer: null,
    phone: '',
    password: ''
  }),
  watch: {
    /* timeCount (val) {
      if (val === 0) {
        this.loginState = 0
        if (this.timer !== null) {
          clearInterval(this.timer)
          this.timer = null
        }
      }
    } */
  },
  methods: {
    login () {
      if (this.$refs.loginFormRef.validate()) {
        this.loginState = 1
        music.loginPhone(this.phone, this.password)
          .then((res) => {
            this.loginState = 0
            if (res.data.code === 200) {
              this.$message.success('登录成功')
              this.$store.commit('setCookieProfile', [res.data.cookie, res.data.profile])
              music.getLiked(res.data.profile.userId)
                .then((res) => {
                  if (res.data.code === 200) {
                    this.$store.commit('setLikedList', res.data.ids)
                  }
                })
              this.$router.back()
            }
          })
          .catch(() => {
            this.loginState = 0
          })
      }
    }
    /* subTimeCount () {
      this.timeCount -= 1
    },
    sendCaptcha () {
      if (this.$refs.loginFormRef.validate()) {
        this.loginState = 1
        music.loginCaptcha(this.phone)
          .then((res) => {
            if (res.data.code === 200) {
              this.message = '发送成功'
              this.showMessage = true
              this.loginState = 2
              this.timeCount = 60
              this.timer = setInterval(this.subTimeCount, 1000)
            } else {
              this.message = '发送失败'
              this.showMessage = true
              this.loginState = 0
            }
          })
          .catch(() => {
            this.message = '发送失败'
            this.showMessage = true
            this.loginState = 0
          })
      }
    }, */
  }
}
</script>

<style scoped>

</style>
