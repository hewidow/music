<template>
  <i-top-bar app-title="视频">
    <template v-slot:main>
      <v-container class="fill-height">
        <v-row>
          <v-col class="text-center pa-0">
            <video controls autoplay id="myVideo">
              您的浏览器不支持 video 标签。
            </video>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="primaryText--text">{{currentSong.name}}</div>
            <div class="secondaryText--text">{{currentSong.ar.map((item) => { return item.name }).join('/')}}</div>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </i-top-bar>
</template>

<script>
import { music } from '@/api/music'
import iTopBar from '@/components/iTopBar'
export default {
  name: 'MusicMovie',
  components: {
    iTopBar
  },
  computed: {
    currentSong () {
      return this.$store.getters.currentSong
    }
  },
  data: () => ({
  }),
  mounted () {
    this.getMv()
  },
  methods: {
    getMv () {
      music.getMv(this.currentSong.mv)
        .then((res) => {
          document.getElementById('myVideo').src = res.data.data.url
        })
    }
  }
}
</script>

<style scoped>
video{
  width: 100%;
}
</style>
