<template>
  <v-app>
    <v-main>
      <keep-alive :exclude="['MusicSearch', 'MusicRankList', 'MusicMovie']">
        <router-view
          @clickPlayIcon="clickPlayIcon"
        ></router-view>
      </keep-alive>
    </v-main>
    <v-footer
      class="pa-0"
      color="primary"
      height="24"
      :style="{ marginBottom: showFooterBar ? '56px' : '0'}"
      fixed
    >
      <v-toolbar
        bottom
        color="musicBar"
        dense
        flat
        class="rounded-pill mx-2"
        style="margin-top: -24px"
        height="48"
      >
        <v-row no-gutters justify="center" align="center">
          <v-col cols="2" @click="openPlayDialog">
            <v-img
              :src="currentSong.al.picUrl"
              aspect-ratio="1"
              class="rounded-circle mb-4"
              max-width="48"
            ></v-img>
          </v-col>
          <v-col cols="7" class="text-center primaryText--text" @click="openPlayDialog" style="text-overflow:ellipsis;overflow:hidden;width: 100px;white-space:nowrap;">
            {{currentSong.name + ' - ' + currentSong.ar.map((item) => { return item.name }).join('/')}}
          </v-col>
          <v-col cols="2" class="text-center">
            <v-btn icon @click="changePlay" height="38" width="38" :disabled="audioDisable">
              <v-progress-circular
                :rotate="-90"
                value="100"
                :color="audioDisable || audioLoading ? 'primary' : 'accent'"
                width="2"
                size="38"
                :indeterminate="false"
              >
                <v-progress-circular
                  :rotate="-90"
                  :value="Math.floor(sliderNow / sliderMax * 100)"
                  :color="audioDisable ? 'primary': 'accent'"
                  width="3"
                  size="36"
                  :indeterminate="audioLoading"
                >
                  <v-icon color="accent" size="28">{{playing?'mdi-pause':'mdi-play'}}</v-icon>
                </v-progress-circular>
              </v-progress-circular>
            </v-btn>
          </v-col>
          <v-col cols="1">
            <v-btn icon @click="openPlayList">
              <v-icon color="accent" size="36">mdi-playlist-music</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-toolbar>
    </v-footer>
    <i-footer-bar v-if="showFooterBar"></i-footer-bar>
    <v-dialog
      v-model="playDialog"
      fullscreen
      transition="dialog-bottom-transition"
    >
      <v-app>
        <v-app-bar
          flat
          color="primary"
          dense
          app
        >
          <v-app-bar-title class="font-weight-bold primaryText--text">正在播放</v-app-bar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="closePlayDialog">
            <v-icon color="secondaryText">mdi-chevron-down</v-icon>
          </v-btn>
        </v-app-bar>
        <i-background-image></i-background-image>
        <v-main>
          <v-container fluid :style="{height: mainHeight }">
            <v-row style="height: 15%">
              <v-col>
                <p class="primaryText--text ma-0 text-h6">{{currentSong.name}}</p>
                <p class="iconBg--text ma-0 subtitle-1">{{currentSong.ar.map((item) => { return item.name }).join('/')}}</p>
              </v-col>
            </v-row>
            <v-row style="height: 50%">
              <v-col style="height: 100%">
                <i-song-lyric :now-time="sliderNow" :lyric-string="lyricString"></i-song-lyric>
              </v-col>
            </v-row>
            <v-row style="height: 10%" class="text-center align-center">
              <v-col cols="4">
                <v-btn icon @click="openComment" :disabled="audioDisable" height="36" width="36">
                  <v-icon color="iconBg" size="36">mdi-comment-processing-outline</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="4">
                <v-btn icon @click="openVideo" :disabled="audioDisable || currentSong.mv === 0" height="36" width="36">
                  <v-icon color="iconBg" size="36">mdi-youtube</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="4">
                <v-btn icon @click="delFromMyLikes" :disabled="audioDisable" height="36" width="36" :loading="heartLoading" v-if="likedList.includes(currentSong.id)">
                  <v-icon color="addLike" size="36">mdi-heart</v-icon>
                  <template v-slot:loader>
                    <span class="custom-loader">
                      <v-icon color="iconBg" size="36">mdi-loading</v-icon>
                    </span>
                  </template>
                </v-btn>
                <v-btn icon @click="addToMyLikes" :disabled="audioDisable" height="36" width="36" :loading="heartLoading" v-else>
                  <v-icon color="iconBg" size="36">mdi-heart-plus-outline</v-icon>
                  <template v-slot:loader>
                    <span class="custom-loader">
                      <v-icon color="addLike" size="36">mdi-loading</v-icon>
                    </span>
                  </template>
                </v-btn>
              </v-col>
            </v-row>
            <v-row style="height: 25%" class="text-center align-center">
              <v-col cols="12">
                <v-slider
                  color="accent"
                  track-color="sliderBar"
                  inverse-label
                  v-model="sliderNow"
                  :min="sliderMin"
                  :max="sliderMax"
                  step="0.1"
                  @change="changeCurrentTime"
                  hide-details
                >
                  <template v-slot:label>
                    <span class="iconBg--text">{{getTime(sliderNow,sliderMax)}}</span>
                  </template>
                </v-slider>
              </v-col>
              <v-col cols="2">
                <v-btn icon @click="changePlayOrder" height="36" width="36">
                  <v-icon color="iconBg" size="36">{{playOrderIcon[playOrder]}}</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="2">
                <v-btn icon @click="playPrev" :disabled="audioDisable" height="48" width="48">
                  <v-icon color="accent" size="48">mdi-skip-previous</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="4">
                <v-btn icon @click="changePlay" :disabled="audioDisable" height="64" width="64">
                  <v-icon color="accent" size="64">{{playing?'mdi-pause-circle':'mdi-play-circle'}}</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="2">
                <v-btn icon @click="playNext" :disabled="audioDisable" height="48" width="48">
                  <v-icon color="accent" size="48">mdi-skip-next</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="2">
                <v-btn icon @click="openPlayList" height="36" width="36">
                  <v-icon color="accent" size="36">mdi-playlist-music</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </v-app>
    </v-dialog>
    <i-comment :show-dialog="showComment" @closeDialog="closeComment"></i-comment>
    <audio
      :src="currentSong.src ? currentSong.src : '127.0.0.1'"
      style="display: none"
      :autoplay="playing"
      ref="audio"
      :loop="playOrder === 2 || playList.length === 1"
      @timeupdate="getCurrentTime"
      @canplaythrough="showTotalTime"
      @ended="audioEnded"
    ></audio>
    <i-play-list
      :show-dialog="playListDialog"
      :play-list="playList"
      :play-index="currentIndex"
      @close="playListDialog = false"
      @delFromPlayList="this.delFromPlayList"
      @clickPlaySong="clickPlaySong"
    ></i-play-list>
  </v-app>
</template>
<script>

import { mapMutations } from 'vuex'
import { music } from '@/api/music'
import iFooterBar from './components/iFooterBar'
import iSongLyric from './components/iSongLyric'
import iPlayList from './components/iPlayList'
import iBackgroundImage from '@/components/iBackgroundImage'
import iComment from '@/components/iComment'

export default {
  name: 'App',
  components: {
    iFooterBar,
    iSongLyric,
    iPlayList,
    iBackgroundImage,
    iComment
  },
  computed: {
    showFooterBar () {
      return ['/music/home', '/music/my'].indexOf(this.$route.path) !== -1
    },
    currentSong () {
      return this.$store.getters.currentSong
    },
    playList () {
      return this.$store.state.playList
    },
    currentIndex () {
      return this.$store.state.currentIndex
    },
    playing () {
      return this.$store.state.playing
    },
    likedList () {
      return this.$store.state.likedList
    }
  },
  data: () => ({
    mainHeight: 0,
    heartLoading: false,
    showComment: false,
    playDialog: false,
    playListDialog: false,
    audioDisable: false,
    audioLoading: false,
    playOrder: 0,
    playOrderIcon: ['mdi-repeat', 'mdi-shuffle-variant', 'mdi-repeat-once'],
    sliderNow: 0,
    sliderMin: 0,
    sliderMax: 1,
    lyricString: '[00:00.000]正在获取歌词，请稍等~'
  }),
  watch: {
    'currentSong.id' () {
      if (this.playList.length > 0) {
        this.lyricString = '[00:00.000]正在获取歌词，请稍等~'
        this.sliderNow = 0
        this.sliderMax = 1
        this.getSongUrl()
        this.getSongLyric()
      }
    },
    playList (val) {
      if (val.length === 0) {
        this.audioDisable = true
        this.lyricString = '[00:00.000]请添加歌曲'
        this.sliderNow = 0
        this.sliderMax = 0
        this.audioPause()
        this.setCurrentIndex(-1)
      } else {
        this.audioDisable = false
        let index = Math.max(0, this.currentIndex)
        index = Math.min(this.playList.length - 1, index)
        if (this.currentIndex !== index) this.setCurrentIndex(index)
      }
    }
  },
  created () {
    this.getSongUrl()
    this.getSongLyric()
  },
  mounted () {
    window.onresize = () => {
      this.mainHeight = (window.innerHeight - 48) + 'px'
    }
    this.mainHeight = (window.innerHeight - 48) + 'px'
  },
  methods: {
    ...mapMutations(['addToPlayList', 'delFromPlayList', 'setCurrentIndex', 'setPlaying', 'setCurrentSongSrc', 'addToLikedList', 'delFromLikedList', 'addToLikedSongs', 'delFromLikedSongs']),
    openVideo () {
      this.audioPause()
      this.playDialog = false
      this.$router.push('/music/mv')
    },
    checkLogin () {
      if (this.$store.state.cookie === null) {
        this.playDialog = false
        this.$router.push('/music/login')
        return false
      }
      return true
    },
    addToMyLikes () {
      if (this.checkLogin()) {
        this.heartLoading = true
        music.setLiked(this.currentSong.id, true)
          .then((res) => {
            if (res.data.code === 200) {
              this.$message.success('已收藏到我的喜欢')
              this.addToLikedList(this.currentSong.id)
              this.addToLikedSongs(this.currentSong)
            }
            this.heartLoading = false
          })
          .catch(() => {
            this.heartLoading = false
          })
      }
    },
    delFromMyLikes () {
      if (this.checkLogin()) {
        this.heartLoading = true
        music.setLiked(this.currentSong.id, false)
          .then((res) => {
            if (res.data.code === 200) {
              this.$message.success('已取消收藏')
              this.delFromLikedList(this.likedList.indexOf(this.currentSong.id))
              this.delFromLikedSongs(this.$store.state.likedSongs.map((item) => { return item.id }).indexOf(this.currentSong.id))
            }
            this.heartLoading = false
          })
          .catch(() => {
            this.heartLoading = false
          })
      }
    },
    openComment () {
      this.showComment = true
    },
    closeComment () {
      this.showComment = false
    },
    changePlay () {
      if (this.playing === false) this.audioPlay()
      else this.audioPause()
    },
    changePlayOrder () {
      this.playOrder = (this.playOrder + 1) % this.playOrderIcon.length
    },
    playPrev () {
      this.setCurrentIndex((this.currentIndex - 1 + this.playList.length) % this.playList.length)
    },
    playNext () {
      this.setCurrentIndex((this.currentIndex + 1) % this.playList.length)
    },
    openPlayList () {
      this.playListDialog = true
    },
    clickPlaySong (index) {
      this.setCurrentIndex(index)
      this.audioPlay()
    },
    clickPlayIcon (item) {
      if (this.playList.length > 0 && item.id === this.playList[this.currentIndex].id) {
        this.changePlay()
      } else {
        let index = this.playList.map((val) => { return val.id }).indexOf(item.id)
        if (index === -1) {
          this.addToPlayList(item)
          index = this.playList.length - 1
        }
        this.clickPlaySong(index)
      }
    },
    openPlayDialog () {
      this.playDialog = true
    },
    closePlayDialog () {
      this.playDialog = false
    },
    Number2Time (val) {
      const now = Math.floor(val)
      return (Array(2).join('0') + Math.floor(now / 60)).slice(-2) + ':' + (Array(2).join('0') + Math.floor(now % 60)).slice(-2)
    },
    getTime (now, max) {
      return this.Number2Time(now) + '/' + this.Number2Time(max)
    },
    audioEnded () {
      if (this.playList.length > 1) {
        if (this.playOrder === 0) this.setCurrentIndex((this.currentIndex + 1) % this.playList.length)
        else if (this.playOrder === 1) {
          let index = 0
          do {
            index = Math.floor(Math.random() * this.playList.length)
          } while (index === this.currentIndex)
          this.setCurrentIndex(index)
        }
      }
    },
    audioPlay () {
      this.setPlaying(true)
      this.$refs.audio.play()
    },
    audioPause () {
      this.setPlaying(false)
      this.$refs.audio.pause()
    },
    getCurrentTime () {
      this.sliderNow = Number(this.$refs.audio.currentTime.toFixed(1))
    },
    changeCurrentTime () {
      this.$refs.audio.currentTime = this.sliderNow
    },
    showTotalTime () {
      this.sliderMax = Number(this.$refs.audio.duration.toFixed(1))
      this.audioLoading = false
    },
    getSongUrl () {
      if (this.currentSong === undefined || this.playList.length === 0) return
      const id = this.currentSong.id
      this.audioLoading = true
      this.setCurrentSongSrc(null)
      music.getSongUrl(id)
        .then((res) => {
          if (this.currentSong.id === id) {
            if (res.data.data[0].url === null) {
              this.audioPause()
              this.$message.error('获取不到《' + this.currentSong.name + ' - ' + this.currentSong.ar.map((item) => {
                return item.name
              }).join('/') + '》的播放url')
              this.delFromPlayList(this.currentIndex)
            } else {
              this.setCurrentSongSrc(res.data.data[0].url)
            }
          }
        })
        .catch(() => {
          if (this.currentSong.id === id) {
            this.audioPause()
            this.$message.error('获取不到《' + this.currentSong.name + ' - ' + this.currentSong.ar.map((item) => {
              return item.name
            }).join('/') + '》的播放url')
            this.delFromPlayList(this.currentIndex)
          }
        })
    },
    getSongLyric () {
      if (this.currentSong === undefined || this.playList.length === 0) return
      const id = this.currentSong.id
      music.getSongLyric(id)
        .then((res) => {
          if (this.currentSong.id === id) this.lyricString = res.data.lrc.lyric
        })
        .catch(() => {
          if (this.currentSong.id === id) this.lyricString = '[00:00.000]网络连接异常'
        })
    }
  }
}
</script>

<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
