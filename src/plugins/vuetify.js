import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: sessionStorage.getItem('theme') ? JSON.parse(sessionStorage.getItem('theme')) : {
        primary: '#08203C', /* 主题色 */
        accent: '#21D49C', /* 主题亮色（图标选中，高亮字体） */
        musicBar: '#0B2848', /* 音乐播放栏颜色 */
        sliderBar: '#394D65', /* 音乐进度条底色 */
        iconBg: '#9CA3AB', /* 图标底色 */
        primaryText: '#FFFFFF', /* 主文字颜色 */
        secondaryText: '#8295b3', /* 次文字颜色 */
        cardBg: '#5061757F', /* 卡片底色（搜索栏，用户信息卡片） */
        backgroundImage: require('../assets/themes/star/main_bg.png'), /* 背景图片 */
        text: '梵星' /* 主题名称 */,
        secondary: '#506175', /* 横向分割线颜色或按钮边框颜色 */
        tertiary: '#19283B', /* 加载时的遮罩颜色 */
        addLike: '#FF6766', /* 添加到收藏的爱心颜色 */
        rankText: '#F4511E', /* 排行榜前几文字颜色 */
        messBg: '#646464E6' /* 消息提示底色 */
      }
    }
  }
})
