<template>
  <div class="app">

    <AppHeader class="app_header"/>

    <Jumbotron v-if="isHome" />

    <section class="app_body" :class="[ isHome ? 'index' : '' ]">
      <nuxt :key="$route.path" />
    </section>

    <AppFooter class="app_footer"/>

    <AudioPlayer/>

    <AudioControl/>

    <span v-if="twitterWidget">
      <script type="text/javascript" async src="https://platform.twitter.com/widgets.js"></script>
    </span>
  </div>
</template>

<script lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
import Jumbotron from '~/components/Jumbotron.vue'
import AudioPlayer from '~/components/AudioPlayer.vue'
import AudioControl from '~/components/AudioControl.vue'

export default {
  components: {
    AppHeader,
    AppFooter,
    Jumbotron,
    AudioPlayer,
    AudioControl
  },
  data() {
    return {
      twitterWidget: false
    }
  },
  mounted() {
    this.$store.watch((state) => state.searchText, this.onChangeQuery)
    this.$store.commit('searchText', this.$route.query.q || '')

    // https://github.com/nuxt/nuxt.js/issues/2000
    this.twitterWidget = true

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

<style>

</style>
