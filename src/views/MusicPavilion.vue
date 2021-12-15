<template>
  <v-container>
    <v-row>
      <v-col>
        <v-skeleton-loader
          height="150"
          type="image"
          v-if="posts.length === 0"
        ></v-skeleton-loader>
        <v-carousel
          cycle
          interval="3000"
          :show-arrows="false"
          height="150"
          hide-delimiters
          hide-delimiter-background
          v-else
        >
          <v-carousel-item
            v-for="(post, index) in posts"
            :key="index"
          >
            <v-img :src="post.pic"></v-img>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" @click="openMusicRank">
        <div class="text-center">
          <v-icon color="accent" size="36">mdi-equalizer</v-icon>
        </div>
        <div class="primaryText--text text-center">排行</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { music } from '@/api/music'

export default {
  name: 'MusicPavilion',
  created () {
    this.getBanner()
  },
  data: () => ({
    posts: []
  }),
  methods: {
    getBanner () {
      music.getBanner()
        .then((res) => {
          this.posts = res.data.banners
        })
    },
    clickPlayIcon (song) {
      this.$emit('clickPlayIcon', song)
    },
    openMusicRank () {
      this.$router.push('/music/rank')
    }
  }
}
</script>

<style scoped>

</style>
