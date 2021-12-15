<template>
  <i-bottom-dialog
    :show-dialog="showDialog"
    @closeDialog="closeDialog"
  >
    <template v-slot:content>
      <v-card
        class="rounded-0"
        color="musicBar"
        style="height: 75vh"
      >
        <v-card-title class="px-4 py-2">
          <span class="primaryText--text font-weight-bold">播放列表</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeDialog">
            <v-icon color="secondaryText">mdi-chevron-down</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider :style="{ borderColor: $vuetify.theme.themes.light.secondary }"></v-divider>
        <v-card-text class="pa-0">
          <v-list color="rgba(0,0,0,0)" class="py-0">
            <div v-show="playList.length === 0" class="primaryText--text text-center subtitle-1">请添加歌曲到该播放列表</div>
            <v-list-item-group>
              <div
                v-for="(item,index) of playList"
                :key="index"
              >
                <v-list-item>
                  <v-row no-gutters class="align-center">
                    <v-col cols="11" @click="clickPlaySong(index)">
                      <v-row no-gutters>
                        <v-col cols="11" class="box">
                          <span :class="(index === playIndex ? 'accent--text' : 'primaryText--text') + ' left'">{{item.name}} </span>
                          <span :class="(index === playIndex ? 'accent--text' : 'secondaryText--text') + ' mx-1 right'"> - {{item.ar.map((item) => { return item.name }).join('/')}}</span>
                        </v-col>
                        <v-col cols="1">
                          <v-icon v-if="index === playIndex" style="transform: rotate(-90deg)" color="accent">mdi-format-align-left</v-icon>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="1">
                      <v-btn icon @click="delFromPlayList(index)">
                        <v-icon color="secondaryText">mdi-close</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-list-item>
                <v-divider :style="{ borderColor: $vuetify.theme.themes.light.secondary }"></v-divider>
              </div>
            </v-list-item-group>
          </v-list>
        </v-card-text>
      </v-card>
    </template>
  </i-bottom-dialog>
</template>

<script>
import iBottomDialog from '@/components/iBottomDialog'
export default {
  name: 'PlayList',
  components: { iBottomDialog },
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    playList: {
      type: Array,
      default: () => []
    },
    playIndex: {
      type: Number,
      default: -1
    }
  },
  methods: {
    closeDialog () {
      this.$emit('close')
    },
    delFromPlayList (index) {
      this.$emit('delFromPlayList', index)
    },
    clickPlaySong (index) {
      this.$emit('clickPlaySong', index)
    }
  }
}
</script>

<style scoped>
.box{
  width: 250px;
  margin: 0 auto;
  display: flex;
  display: -webkit-flex;
  flex-flow: row nowrap;
  -webkit-flex-flow: row nowrap;
  justify-content: flex-start;
  -webkit-justify-content: flex-start;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.left{
  flex: 0 0 auto;
  -webkit-flex: 0 0 auto;
  max-width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.right{
  flex: 1 1 auto;
  -webkit-flex: 1 1 auto;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
