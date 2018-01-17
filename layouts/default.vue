<template>
  <div class="app">

    <AppHeader class="app_header"/>

    <section class="app_body">
      <nuxt :key="$route.path" />
    </section>

    <AppFooter class="app_footer"/>

    <AudioPlayer>
    </AudioPlayer>

    <AudioControlBar>
    </AudioControlBar>


    <span v-if="twitterWidget">
      <script type="text/javascript" async src="https://platform.twitter.com/widgets.js"></script>
    </span>
  </div>
</template>

<script lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
import AudioPlayer from '~/components/AudioPlayer.vue'
import AudioControlBar from '~/components/AudioControlBar.vue'

export default {
  components: {
    AppHeader,
    AppFooter,
    AudioPlayer,
    AudioControlBar
  },
  data() {
    return {
      twitterWidget: false
    }
  },
  mounted() {
    this.$store.watch(state => state.searchText, this.onChangeQuery)
    this.$store.commit('searchText', this.$route.query.q || '')

    // https://github.com/nuxt/nuxt.js/issues/2000
    this.twitterWidget = true

    // Load all content data on client init
    this.$store.app.$content('/episode').getAll()
    this.$store.app.$content('/actors').getAll()
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
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}
.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}
.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}
.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.site-nav {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin: 2rem 0;
  text-decoration: none;
  margin-bottom: 3rem;
}

.site-title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 600;
  font-size: 3.5rem;
  color: #35495e;
  letter-spacing: 1px;
  margin-left: 1.5rem;
}

.site-logo {
  width: 200px;
  height: 200px;
}
</style>
