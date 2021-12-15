<template>
  <i-fullscreen-dialog app-title="评论" :show-dialog="showDialog" @closeDialog="closeDialog">
    <template v-slot:content>
      <i-overlay :overlay="overlay" :z-index="0"></i-overlay>
      <v-container>
        <v-row>
          <v-col>
            <span class="primaryText--text subtitle-1">精彩评论</span>
          </v-col>
        </v-row>
        <v-row
          dense
          v-for="(comment,index) of commentList"
          :key="index"
        >
          <v-col cols="2">
            <v-badge
              avatar
              overlap
              bottom
              v-if="comment.user.avatarDetail"
            >
              <template v-slot:badge>
                <v-avatar tile>
                  <v-img
                    :src="comment.user.avatarDetail.identityIconUrl"
                  ></v-img>
                </v-avatar>
              </template>
              <v-img
                :src="comment.user.avatarUrl"
                aspect-ratio="1.0"
                class="rounded-circle"
                height="48"
                width="48"
              ></v-img>
            </v-badge>
            <v-img
              :src="comment.user.avatarUrl"
              aspect-ratio="1.0"
              class="rounded-circle"
              height="48"
              width="48"
              v-else
            ></v-img>
          </v-col>
          <v-col cols="6">
            <div class="secondaryText--text subtitle-1">{{ comment.user.nickname }}</div>
            <div class="secondaryText--text caption">{{ formatDate(comment.time, 'yyyy-MM-dd hh:mm:ss') }}</div>
          </v-col>
          <v-col cols="4" class="text-end">
            <v-row no-gutters class="text-center" align="baseline">
              <v-col class="secondaryText--text subtitle-2 text-end" cols="12">
                {{ likedCountToString(comment.likedCount) }}
                <v-icon color="secondaryText" size="16">mdi-thumb-up-outline</v-icon>
              </v-col>
<!--              <v-col cols="1">
                <div class="secondaryText&#45;&#45;text">|</div>
              </v-col>
              <v-col cols="4">
                <div class="secondaryText&#45;&#45;text subtitle-2">回复</div>
              </v-col>-->
            </v-row>
          </v-col>
          <v-col cols="2"></v-col>
          <v-col cols="10">
            <div class="subtitle-2 primaryText--text">{{ comment.content }}</div>
          </v-col>
          <v-col cols="2"></v-col>
          <v-col cols="10">
            <v-card v-if="comment.beReplied && comment.beReplied.length > 0" :style="{backgroundColor: $vuetify.theme.themes.light.cardBg}" flat>
              <v-card-text class="py-2 px-3">
                <span class="accent--text subtitle-2">{{comment.beReplied[0].user.nickname}}：</span>
                <span class="primaryText--text subtitle-2">{{comment.beReplied[0].content}}</span>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row><v-col></v-col></v-row>
        <v-row><v-col></v-col></v-row>
      </v-container>
    </template>
  </i-fullscreen-dialog>
</template>

<script>
import { music } from '@/api/music'
import iOverlay from '@/components/iOverlay'
import iFullscreenDialog from '@/components/iFullscreenDialog'
export default {
  name: 'MusicComment',
  components: {
    iOverlay,
    iFullscreenDialog
  },
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    showDialog (val) {
      if (val === true) {
        this.commentList.splice(0, this.commentList.length)
        this.getComment()
      }
    }
  },
  data: () => ({
    overlay: false,
    commentList: []
  }),
  methods: {
    closeDialog () {
      this.$emit('closeDialog')
    },
    getComment () {
      this.overlay = true
      music.getComment(this.$store.getters.currentSong.id)
        .then((res) => {
          this.commentList = res.data.hotComments
          this.overlay = false
        })
    },
    likedCountToString (val) {
      if (val < 10000) return String(val)
      else return String(Math.floor(val / 10000) + '万')
    },
    padLeftZero (str) {
      return ('00' + str).substr(str.length)
    },
    formatDate (date, fmt) {
      date = new Date(date)
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for (const k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          const str = o[k] + ''
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str))
        }
      }
      return fmt
    }
  }
}
</script>

<style scoped>

</style>
