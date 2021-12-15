<template>
  <div>
    <v-app-bar max-height="48" height="48" color="primary" elevation="0" app flat>
      <v-tabs
        v-model="tab"
        active-class="font-weight-bold text-h6"
        slider-color="accent"
        slider-size="4"
      >
        <v-tab class="primaryText--text subtitle-1 text-center">我的</v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <v-btn icon @click="openSetting" color="primaryText">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <i-background-image></i-background-image>
    <v-main class="pa-0">
      <i-search-song></i-search-song>
      <v-tabs-items v-model="tab" style="background-color: rgba(0,0,0,0)">
        <v-tab-item>
          <music-user></music-user>
        </v-tab-item>
      </v-tabs-items>
    </v-main>
  </div>
</template>

<script>
import iBackgroundImage from '@/components/iBackgroundImage'
import iSearchSong from '@/components/iSearchSong'
import MusicUser from '@/views/MusicUser'
export default {
  name: 'My',
  components: {
    iBackgroundImage,
    iSearchSong,
    MusicUser
  },
  data: () => ({
    tab: 0
  }),
  methods: {
    openSetting () {
      this.$router.push('/music/setting')
    }
  }
}
</script>

<style scoped>

</style>
