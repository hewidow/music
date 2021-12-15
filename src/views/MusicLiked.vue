<template>
  <i-top-bar app-title="我的喜欢">
    <template v-slot:main>
      <i-overlay :overlay="overlay" :z-index="0"></i-overlay>
        <div class="pa-2">
          <v-btn text @click="addAllSongsToPlayList">
            <v-icon color="accent" left size="24">mdi-plus-box-multiple-outline</v-icon>
            <span class="primaryText--text subtitle-1">一键添加({{likedSongs.length}})</span>
          </v-btn>
        </div>
        <v-list color="rgba(0,0,0,0)">
            <v-list-item
              v-for="(song, index) of likedSongs"
              :key="index"
              class="pa-0"
            >
              <v-col cols="9" class="align-self-center">
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
  name: 'MusicLiked',
  components: {
    iTopBar,
    iOverlay
  },
  computed: {
    currentSong () {
      return this.$store.getters.currentSong
    },
    playing () {
      return this.$store.state.playing
    },
    playList () {
      return this.$store.state.playList
    },
    likedSongs () {
      return this.$store.state.likedSongs
    }
  },
  mounted () {
    this.getLiked()
  },
  data: () => ({
    overlay: false
  }),
  methods: {
    addAllSongsToPlayList () {
      for (const song of this.likedSongs) {
        if (!this.playList.map((item) => { return item.id }).includes(song.id)) {
          this.$store.commit('addToPlayList', song)
        }
      }
    },
    clickPlayIcon (song) {
      this.$emit('clickPlayIcon', song)
    },
    getLiked () {
      this.overlay = true
      music.getLiked(this.$store.state.profile.userId)
        .then((res) => {
          if (res.data.code === 200) {
            this.$store.commit('setLikedList', res.data.ids)
            music.getSongDetail(this.$store.state.likedList)
              .then((res) => {
                if (res.data.code === 200) {
                  this.$store.commit('setLikedSongs', res.data.songs)
                }
                this.overlay = false
              })
              .catch(() => {
                this.overlay = false
              })
          }
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
