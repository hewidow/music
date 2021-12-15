<template>
  <v-container fluid @click="searchSong">
    <v-row>
      <v-col>
        <v-text-field
          solo
          dense
          flat
          hide-details
          class="rounded-pill"
          color="primaryText"
          :background-color="$vuetify.theme.themes.light.cardBg"
        >
          <template v-slot:append>
            <v-icon color="secondaryText">mdi-magnify</v-icon>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'SearchSong',
  data: () => ({
  }),
  methods: {
    searchSong () {
      this.$router.push('/music/search')
    }
  }
}
</script>

<style scoped>

</style>
