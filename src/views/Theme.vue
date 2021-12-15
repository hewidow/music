<template>
 <i-top-bar app-title="主题">
   <template v-slot:main>
     <v-container>
       <v-row dense>
         <v-col
           v-for="(theme, index) of themes"
           :key="index"
           cols="4"
         >
           <v-card @click="changeTheme(theme)" :style="{ backgroundColor: $vuetify.theme.themes.light.cardBg }" class="rounded-lg">
             <v-card-text class="pa-1">
               <v-img
                 :src="theme.backgroundImage"
                 aspect-ratio="0.67"
                 class="rounded-lg"
               ></v-img>
               <div class="text-center primaryText--text mt-1">{{theme.text}}</div>
             </v-card-text>
           </v-card>
         </v-col>
       </v-row>
     </v-container>
   </template>
 </i-top-bar>
</template>

<script>
import iTopBar from '@/components/iTopBar'
export default {
  name: 'Theme',
  components: {
    iTopBar
  },
  data: () => ({
    themes: [
      {
        primary: '#08203C',
        accent: '#21D49C',
        musicBar: '#0B2848',
        sliderBar: '#394D65',
        iconBg: '#9CA3AB',
        primaryText: '#FFFFFF',
        secondaryText: '#8295b3',
        cardBg: '#5061757F',
        backgroundImage: require('../assets/themes/star/main_bg.png'),
        text: '梵星',
        secondary: '#506175',
        tertiary: '#19283B',
        addLike: '#FF6766',
        rankText: '#F4511E',
        messBg: '#646464E6'
      },
      {
        primary: '#FFA8B8',
        accent: '#FF0A65',
        musicBar: '#F093A5',
        sliderBar: '#F6C7D1',
        iconBg: '#AC4860',
        primaryText: '#78001C',
        secondaryText: '#A9485C',
        cardBg: '#EF94A67F',
        backgroundImage: require('../assets/themes/cherry/main_bg.png'),
        text: '哈尼粉',
        secondary: '#506175',
        tertiary: '#19283B',
        addLike: '#FF6766',
        rankText: '#F4511E',
        messBg: '#646464E6'
      },
      {
        primary: '#6AD6D8',
        accent: '#0678B4',
        musicBar: '#5CCBD4',
        sliderBar: '#97DEE0',
        iconBg: '#2D7E91',
        primaryText: '#064362',
        secondaryText: '#5C7D74',
        cardBg: '#5EC4C97F',
        backgroundImage: require('../assets/themes/love/main_bg.png'),
        text: '恋空',
        secondary: '#506175',
        tertiary: '#19283B',
        addLike: '#FF6766',
        rankText: '#F4511E',
        messBg: '#646464E6'
      }
    ]
  }),
  methods: {
    changeTheme (theme) {
      this.$vuetify.theme.themes.light = theme
      sessionStorage.setItem('theme', JSON.stringify(theme))
    }
  }
}
</script>

<style scoped>

</style>
