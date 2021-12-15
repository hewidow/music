<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card :color="$vuetify.theme.themes.light.cardBg" flat class="text-center" v-if="$store.state.cookie === null">
          <v-btn color="accent" class="rounded-pill my-6 primary--text" @click="login">
            <v-icon>mdi-account</v-icon>
            &nbsp;立即登录
          </v-btn>
          <span class="primaryText--text subtitle-2 pl-4">立即登录享专属推荐</span>
        </v-card>
        <v-card :color="$vuetify.theme.themes.light.cardBg" flat class="text-center" v-else>
          <v-card-text class="subtitle-1">
            <v-row align="center" class="text-center">
              <v-col cols="4">
                <v-avatar size="48">
                  <v-img
                    aspect-ratio="1.0"
                    :src="$store.state.profile.avatarUrl"
                  ></v-img>
                </v-avatar>
              </v-col>
              <v-col cosl="8">
                <span class="primaryText--text">{{$store.state.profile.nickname}}</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <span class="primaryText--text">关注</span>
                <span class="secondaryText--text pl-1">{{$store.state.profile.follows}}</span>
              </v-col>
              <v-col>
                <span class="secondaryText--text">|</span>
              </v-col>
              <v-col>
                <span class="primaryText--text">粉丝</span>
                <span class="secondaryText--text pl-1">{{$store.state.profile.followeds}}</span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" @click="openLiked">
        <div class="text-center">
          <v-icon color="accent" size="36">mdi-heart</v-icon>
        </div>
        <div class="primaryText--text text-center">喜欢</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'MusicUser',
  data: () => ({
    showLogin: false
  }),
  methods: {
    checkLogin () {
      if (this.$store.state.cookie === null) {
        this.playDialog = false
        if (this.$route.path !== '/music/login') {
          this.$router.push('/music/login')
        }
        return false
      }
      return true
    },
    openLiked () {
      if (this.checkLogin()) {
        this.$router.push('/music/liked')
      }
    },
    login () {
      this.$router.push('/music/login')
    }
  }
}
</script>

<style scoped>

</style>
