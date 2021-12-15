<template>
  <i-top-bar :app-title="rank.name">
    <template v-slot:main>
      <i-overlay :overlay="overlay" :z-index="0"></i-overlay>
      <v-list color="rgba(0,0,0,0)">
        <v-list-item
          v-for="(song, index) of rankList"
          :key="index"
          class="pa-0"
        >
          <v-col cols="1"
                 :class="(currentSong.id === song.id ? 'accent--text': (index < 3 ? ' rankText--text': 'primaryText--text') ) + ' align-self-center'">
            {{ index + 1 }}
          </v-col>
          <v-col cols="3">
            <v-img
              :src="song.al.picUrl"
              aspect-ratio="1"
              class="rounded-lg"
            ></v-img>
          </v-col>
          <v-col cols="5" class="align-self-center">
            <p
              :class="(currentSong.id === song.id ? 'accent--text': 'primaryText--text') + ' subtitle-1 mb-0 text-truncate'">
              {{ song.name }}</p>
            <p
              :class="(currentSong.id === song.id ? 'accent--text': 'secondaryText--text') + ' subtitle-2 mb-0 text-truncate'">
              {{ song.ar.map((item) => { return item.name }).join('/') }}</p>
          </v-col>
          <v-col cols="1" class="text-start">
            <v-btn icon height="32" width="32" @click="clickPlayIcon(song)">
              <v-icon
                size="32"
                :color="(currentSong.id === song.id ? 'accent': 'iconBg')"
              >{{ currentSong.id === song.id && playing ? 'mdi-pause-circle-outline' : 'mdi-play-circle-outline' }}
              </v-icon>
            </v-btn>
          </v-col>
          <v-col cols="2" class="text-end">
            <v-btn icon @click="$store.commit('addToPlayList', song)" height="32" width="32"
                   v-if="playList.map((item)=>{return item.id}).indexOf(song.id) === -1">
              <v-icon size="32" color="iconBg">mdi-plus-circle-outline</v-icon>
            </v-btn>
            <v-btn icon height="32" width="32" v-else>
              <v-icon size="32" color="accent">mdi-check-circle-outline</v-icon>
            </v-btn>
          </v-col>
        </v-list-item>
        <v-list-item></v-list-item>
      </v-list>
    </template>
  </i-top-bar>
</template>

<script>
import { music } from '@/api/music'
import iTopBar from '@/components/iTopBar'
import iOverlay from '@/components/iOverlay'

export default {
  name: 'MusicRankList',
  components: {
    iTopBar,
    iOverlay
  },
  computed: {
    rank () {
      return this.$store.state.rank
    },
    currentSong () {
      return this.$store.getters.currentSong
    },
    playing () {
      return this.$store.state.playing
    },
    playList () {
      return this.$store.state.playList
    }
  },
  data: () => ({
    overlay: false,
    rankList: []
  }),
  mounted () {
    this.getRankList(this.rank.id)
  },
  methods: {
    clickPlayIcon (item) {
      this.$emit('clickPlayIcon', item)
    },
    getRankList (id) {
      this.overlay = true
      this.rankList = []
      music.getPlayList(id)
        .then((res) => {
          if (res.data.code === 200) {
            const getMusicList = res.data.playlist.tracks
            for (let i = 0; i < getMusicList.length; ++i) {
              this.rankList.push(Object.assign({}, getMusicList[i]))
              if (this.rankList.length === 10) break
            }
          }
          this.overlay = false
        })
        .catch(() => {
          this.overlay = false
        })
    }
  }
}
</script>

<style scoped>

</style>
