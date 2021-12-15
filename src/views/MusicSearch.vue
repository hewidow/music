<template>
  <i-top-bar>
    <template v-slot:titleAppend>
      <v-text-field
        v-model="keywords"
        dense
        flat
        hide-details
        class="rounded-pill"
        color="primaryText"
        :background-color="$vuetify.theme.themes.light.cardBg"
        autofocus
        id="search-input"
        solo
      >
        <template v-slot:append>
          <v-icon @click="searchSong" color="secondaryText">mdi-magnify</v-icon>
        </template>
      </v-text-field>
    </template>
    <template v-slot:main>
      <i-overlay :overlay="overlay" :z-index="0"></i-overlay>
      <v-container fluid>
        <v-row
          v-if="keywords === ''"
        >
          <v-col cols="12">
            <div class="primaryText--text font-weight-bold text-h6">热门搜索</div>
          </v-col>
          <v-col
            cols="12"
            v-if="hots.length === 0"
          >
            <v-row>
              <v-col
                cols="6"
                v-for="index of 10"
                :key="index"
              >
                <v-row>
                  <v-col cols="2">
                    <span :class="(index <= 4 ? 'rankText--text' : 'secondaryText--text')">{{ index }}</span>
                  </v-col>
                  <v-col cols="10">
                    <v-skeleton-loader
                      type="chip"
                    ></v-skeleton-loader>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            cols="6"
            v-for="(hot, index) of hots"
            :key="index"
          >
            <v-row>
              <v-col cols="2">
                <span :class="(index < 4 ? 'rankText--text' : 'secondaryText--text')">{{ index + 1 }}</span>
              </v-col>
              <v-col cols="10">
                <v-chip outlined @click="searchHotKeywords(hot.first)" color="secondary" text-color="primaryText">
                  {{ hot.first }}
                </v-chip>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row
          v-if="keywords !== '' && !searchStateDone"
        >
          <v-col>
            <v-list-item
              v-for="(suggest, index) of searchSuggest"
              :key="index"
              @click="searchHotKeywords(suggest.keyword)"
            >
              <v-list-item-icon>
                <v-icon color="secondaryText">mdi-magnify</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="primaryText--text">{{ suggest.keyword }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
        <v-row
          v-if="keywords !== '' && searchStateDone"
        >
          <v-col class="pa-0">
            <div
              v-if="songs.length === 0 && !overlay"
              class="font-weight-bold text-center primaryText--text"
            >没有搜索到歌曲
            </div>
            <v-list color="rgba(0,0,0,0)">
              <v-list-item
                v-for="(song,index) of songs"
                :key="index"
                class="pa-0"
              >
                <v-col cols="3">
                  <v-img
                    :src="song.al.picUrl"
                    aspect-ratio="1"
                    class="rounded-lg"
                  ></v-img>
                </v-col>
                <v-col cols="6" class="align-self-center">
                  <p :class="(playId === song.id ? 'accent--text': 'primaryText--text') + ' subtitle-1 mb-0 text-truncate'">
                    {{ song.name }}</p>
                  <p :class="(playId === song.id ? 'accent--text': 'secondaryText--text') + ' subtitle-2 mb-0 text-truncate'">
                    {{ song.ar.map((item) => { return item.name }).join('/') }}</p>
                </v-col>
                <v-col cols="1" class="text-start">
                  <v-btn icon height="32" width="32" @click="clickPlayIcon(song)">
                    <v-icon
                      size="32"
                      :color="(playId === song.id ? 'accent': 'iconBg')"
                    >{{ playId === song.id && playing ? 'mdi-pause-circle-outline' : 'mdi-play-circle-outline' }}
                    </v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="2" class="text-end">
                  <v-btn icon @click="addToPlayList(song)" height="32" width="32"
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
          </v-col>
        </v-row>
      </v-container>
    </template>
  </i-top-bar>
</template>

<script>
import { music } from '@/api/music'
import iTopBar from '@/components/iTopBar'
import iOverlay from '@/components/iOverlay'

export default {
  name: 'MusicSearch',
  components: {
    iTopBar,
    iOverlay
  },
  computed: {
    playList () {
      return this.$store.state.playList
    },
    playId () {
      return this.$store.getters.currentSong.id
    },
    playing () {
      return this.$store.state.playing
    }
  },
  data: () => ({
    keywords: '',
    overlay: false,
    hots: [],
    songs: [],
    searchStateDone: false,
    searchSuggest: []
  }),
  mounted () {
    this.searchHot()
    document.getElementById('search-input').style.color = String(this.$vuetify.theme.themes.light.primaryText)
    document.getElementById('search-input').style.caretColor = String(this.$vuetify.theme.themes.light.accent)
  },
  watch: {
    keywords (val) {
      this.songs.splice(0, this.songs.length)
      if (this.overlay === false) this.searchStateDone = false
      if (val !== '') {
        music.getSearchSuggest(val)
          .then((res) => {
            this.searchSuggest = res.data.result.allMatch
          })
      }
    },
    '$vuetify.theme.themes.light.primaryText' (val) {
      document.getElementById('search-input').style.color = String(val)
    },
    '$vuetify.theme.themes.light.accent' (val) {
      document.getElementById('search-input').style.caretColor = String(val)
    }
  },
  methods: {
    searchHotKeywords (keywords) {
      this.keywords = keywords
      this.searchSong()
    },
    searchHot () {
      music.searchHot()
        .then((res) => {
          if (res && res.status === 200) {
            this.hots = res.data.result.hots
          }
        })
    },
    searchSong () {
      if (this.keywords === '') return
      this.overlay = true
      this.songs.splice(0, this.songs.length)
      this.searchStateDone = true
      music.searchSong(this.keywords)
        .then((res) => {
          if (res.data.code === 200 && res.data.result.songs && res.data.result.songs.length > 0) {
            const getMusicList = res.data.result.songs
            for (let i = 0; i < getMusicList.length; ++i) {
              this.songs.push(Object.assign({}, getMusicList[i]))
              if (this.songs.length === 15) break
            }
          }
          this.overlay = false
        })
    },
    addToPlayList (song) {
      this.$store.commit('addToPlayList', song)
    },
    clickPlayIcon (song) {
      this.$emit('clickPlayIcon', song)
    }
  }
}
</script>

<style>
</style>
