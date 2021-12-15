<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <span class="primaryText--text subtitle-1">热门推荐</span>
      </v-col>
      <v-col cols="12">
        <v-slide-group
          v-if="loading"
        >
          <v-slide-item
            v-for="i of 10"
            :key="i"
          >
            <v-skeleton-loader
              type="image"
              width="100"
              height="100"
              class="ma-2"
            ></v-skeleton-loader>
          </v-slide-item>
        </v-slide-group>
        <v-slide-group
          v-else
        >
          <v-slide-item
            v-for="(recommend, index) of recommends"
            :key="index"
          >
            <div @click="openRecommendList(recommend)" class="ma-2">
              <v-badge
                color="secondary"
                overlap
                :content="NumberToString(recommend.playCount)"
                bottom
                offset-x="100"
              >
                <v-avatar
                  rounded
                  size="100"
                >
                  <v-img
                    aspect-ratio="1.0"
                    :src="recommend.picUrl"
                  ></v-img>
                </v-avatar>
              </v-badge>
              <div class="primaryText--text text-truncate mt-2" style="width: 100px">{{recommend.name}}</div>
            </div>
          </v-slide-item>
        </v-slide-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { music } from '@/api/music'
export default {
  name: 'MusicRecommend',
  data: () => ({
    loading: false,
    recommends: []
  }),
  mounted () {
    this.getPersonalized()
  },
  methods: {
    getPersonalized () {
      this.loading = true
      music.getPersonalized()
        .then((res) => {
          this.loading = false
          this.recommends = res.data.result
        })
    },
    openRecommendList (recommend) {
      this.$store.commit('setRank', recommend)
      this.$router.push('/music/rankList')
    },
    NumberToString (val) {
      if (val < 10000) return String(val)
      else if (val < 100000000) return String(Math.floor(val / 10000)) + '万'
      return String(Math.floor(val / 100000000)) + '亿'
    }
  }
}
</script>

<style scoped>

</style>
