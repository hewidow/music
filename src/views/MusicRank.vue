<template>
  <i-top-bar app-title="音乐排行榜">
    <template v-slot:main>
      <i-overlay :overlay="overlay" :z-index="0"></i-overlay>
      <v-container>
        <v-row dense>
          <v-col
            v-for="(rank, index) of topList"
            :key="index"
            :cols="rank.tracks.length > 0 ? 12 : 4"
            @click="openRankList(rank)"
          >
            <v-container class="pa-0">
              <v-row class="text-center mb-4 rounded-lg" no-gutters :style="{ backgroundColor: rank.tracks.length > 0 ? $vuetify.theme.themes.light.cardBg : '' }">
                <v-col :cols="rank.tracks.length === 0 ? 12 : 4" class="pa-0" align-self="center">
                  <v-badge
                    color="secondary"
                    overlap
                    :content="NumberToString(rank.playCount)"
                    bottom
                    :offset-x="rank.tracks.length === 0 ? 80 : 100"
                  >
                    <v-avatar
                      rounded
                      :size="rank.tracks.length === 0 ? 80 : 100"
                    >
                      <v-img
                        aspect-ratio="1.0"
                        :src="rank.coverImgUrl"
                      ></v-img>
                    </v-avatar>
                  </v-badge>
                </v-col>
                <v-col cols="8" v-if="rank.tracks.length > 0" class="text-start">
                  <div class="primaryText--text">
                    <span class="primaryText--text subtitle-1">{{rank.name}}</span>
                    <span class="primaryText--text caption">_{{rank.updateFrequency}}</span>
                  </div>
                  <div
                    v-for="(track, index) of rank.tracks"
                    :key="index"
                  >
                     <div class="text-truncate">
                       <span class="primaryText--text subtitle-2">{{index + 1}}. {{track.first}} - </span>
                       <span class="secondaryText--text subtitle-2">{{track.second}}</span>
                     </div>
                  </div>
                </v-col>
              </v-row>
              <div class="text-center primaryText--text" v-if="rank.tracks.length === 0">{{rank.name}}</div>
            </v-container>
          </v-col>
        </v-row>
        <v-row><v-col></v-col></v-row>
        <v-row><v-col></v-col></v-row>
        <v-row><v-col></v-col></v-row>
      </v-container>
    </template>
  </i-top-bar>
</template>

<script>
import { music } from '@/api/music'
import iTopBar from '@/components/iTopBar'
import iOverlay from '@/components/iOverlay'
export default {
  name: 'MusicRank',
  components: {
    iTopBar,
    iOverlay
  },
  props: {
    playList: {
      type: Array,
      default: () => []
    },
    playId: {
      type: Number,
      default: -1
    },
    playing: {
      type: Boolean,
      default: false
    },
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    topList: [],
    rankList: [],
    overlay: false
  }),
  mounted () {
    this.getTopList()
  },
  methods: {
    openRankList (rank) {
      this.$store.commit('setRank', rank)
      this.$router.push('/music/rankList')
    },
    addToPlayList (song) {
      this.$store.commit('addToPlayList', song)
    },
    clickPlayIcon (song) {
      this.$emit('clickPlayIcon', song)
    },
    NumberToString (val) {
      if (val < 10000) return String(val)
      else if (val < 100000000) return String(Math.floor(val / 10000)) + '万'
      return String(Math.floor(val / 100000000)) + '亿'
    },
    getTopList () {
      this.overlay = true
      music.getTopList()
        .then((res) => {
          this.topList = res.data.list
          this.overlay = false
        })
    }
  }
}
</script>

<style scoped>

</style>
