<template>
  <div class="swiper-container" style="overflow: hidden">
    <div class="swiper-wrapper text-center">
      <div
        v-for="(item, index) of lyricData"
        :key="index"
        :class="swiperClass(index)"
      >{{item.text}}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SongLyric',
  props: {
    nowTime: {
      type: Number,
      default: 0
    },
    lyricString: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    lyricIndex: 0,
    mySwiper: null
  }),
  mounted () {
    this.init()
  },
  computed: {
    lyricData: function () {
      let lyric = this.lyricString
      lyric = lyric.replaceAll('\\r\\n', '\\n')
      lyric = lyric.replace(/[\n]/g, '\\n')
      const arr = lyric.split('\\n')
      const res = []
      const pattern = /^\[(.*?)\](.*)$/
      for (const i of arr) {
        if (i !== '') {
          const r = pattern.exec(i)
          res.push({ time: this.timeToNumber(r[1]), text: r[2] })
        }
      }
      return res
    },
    swiperClass () {
      return function (index) {
        let swiper = 'swiper-slide '
        if (this.lyricIndex === index) swiper += 'accent--text'
        else swiper += 'primaryText--text'
        return swiper
      }
    }
  },
  watch: {
    nowTime (val) {
      let index = 0
      for (let i = 0; i < this.lyricData.length; ++i) {
        if (this.lyricData[i].time < val) index = i
        else break
      }
      if (this.lyricIndex !== index) {
        this.lyricIndex = index
        index -= 4
        if (index < 0) index = 0
        this.mySwiper.slideTo(index, 200)
        this.mySwiper.updateSlides()
        this.mySwiper.updateSize()
      }
    },
    lyricData () {
      this.init()
    }
  },
  methods: {
    init () {
      if (this.mySwiper === null) {
        this.mySwiper = new this.$swiper('.swiper-container', {
          direction: 'vertical',
          slidesPerView: 'auto'
        })
      }
      this.mySwiper.updateSlides()
      this.mySwiper.updateSize()
      this.lyricIndex = 0
    },
    timeToNumber (time) {
      const arr = time.split(':')
      return Number(arr[0] * 60) + Number(arr[1])
    }
  }
}
</script>

<style scoped>
.swiper-container {
  width: 100%;
  height: 100%;
}
</style>
