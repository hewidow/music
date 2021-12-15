<template>
  <div>
    <v-app-bar max-height="48" height="48" color="primary" elevation="0" app flat>
      <v-tabs
        v-model="tab"
        active-class="font-weight-bold text-h6"
        slider-color="accent"
        slider-size="4"
      >
        <v-tab class="primaryText--text subtitle-1 text-center">推荐</v-tab>
        <v-tab class="primaryText--text subtitle-1 text-center">音乐馆</v-tab>
      </v-tabs>
    </v-app-bar>
    <i-background-image></i-background-image>
    <v-main class="pa-0">
      <i-search-song></i-search-song>
      <v-tabs-items v-model="tab" style="background-color: rgba(0,0,0,0)">
        <v-tab-item>
          <music-recommend
            @clickPlayIcon="clickPlayIcon"
          ></music-recommend>
        </v-tab-item>
        <v-tab-item>
          <music-pavilion
            @clickPlayIcon="clickPlayIcon"
          ></music-pavilion>
        </v-tab-item>
      </v-tabs-items>
    </v-main>
  </div>
</template>

<script>
import iSearchSong from '@/components/iSearchSong'
import MusicPavilion from '../views/MusicPavilion'
import MusicRecommend from '../views/MusicRecommend'
import iBackgroundImage from '@/components/iBackgroundImage'
export default {
  name: 'Home',
  components: {
    iBackgroundImage,
    iSearchSong,
    MusicPavilion,
    MusicRecommend
  },
  data: () => ({
    tab: 0
  }),
  methods: {
    clickPlayIcon (song) {
      this.$emit('clickPlayIcon', song)
    }
  }
}
</script>

<style scoped>
</style>
