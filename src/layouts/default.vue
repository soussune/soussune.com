<template>
  <div class="app">

    <AppHeader class="app_header" fixed />

    <Jumbotron class="app_jumbotron" v-if="isHome"/>

    <AppBody class="app_body"/>

    <AppFooter class="app_footer"/>

    <AudioElement/>

    <AudioControl/>

  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue'
import AppBody from '~/components/AppBody.vue'
import AppFooter from '~/components/AppFooter.vue'
import Jumbotron from '~/components/Jumbotron.vue'
import AudioElement from '~/components/AudioElement.vue'
import AudioControl from '~/components/AudioControl.vue'

export default {
  components: {
    AppHeader,
    AppBody,
    AppFooter,
    Jumbotron,
    AudioElement,
    AudioControl
  },
  mounted() {
    this.$store.watch((state) => state.searchText, this.onChangeQuery)
    this.$store.commit('searchText', this.$route.query.q || '')

    // Load all content data on client init
    this.$store.app.$content('/episode').getAll()
    this.$store.app.$content('/actors').getAll()
  },
  computed: {
    isHome() {
      return this.$route.path === '/'
    }
  },
  methods: {
    onChangeQuery(val) {
      const isEmpty = val === ''
      const name = isEmpty ? {} : { name: 'episode' }
      this.$router.push({ ...name, query: isEmpty ? {} : { q: val } })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
