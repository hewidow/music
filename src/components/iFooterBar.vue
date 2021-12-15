<template>
  <v-footer
    padless
    fixed
    color="primary"
  >
    <v-row no-gutters align="center" justify="center">
      <v-col
        v-for="(item, index) of items"
        :key="index"
        @click="$router.push(item.to)"
        class="text-center"
      >
        <div>
          <v-icon size="32" :color="chosenColor(item.to)">{{$route.path === item.to ? item.icon[0] : item.icon[1]}}</v-icon>
        </div>
        <div :class="chosenColor(item.to) + '--text'">{{item.text}}</div>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: 'iFooter',
  computed: {
    chosenColor () {
      return function (to) {
        return this.$route.path === to ? 'accent' : 'iconBg'
      }
    }
  },
  data: () => ({
    items: [
      {
        text: '首页',
        icon: [
          'mdi-home',
          'mdi-home-outline'
        ],
        to: '/music/home'
      },
      {
        text: '我的',
        icon: [
          'mdi-account',
          'mdi-account-outline'
        ],
        to: '/music/my'
      }
    ]
  }),
  methods: {
  }
}
</script>

<style scoped>

</style>
