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
  data () {
    return {
      twitterWidget: false
    }
  },
  async mounted () {
    // https://github.com/nuxt/nuxt.js/issues/2000
    this.twitterWidget = true

    this.$store.commit('searchText', this.$route.query.q || '')
    this.$store.watch((state) => state.searchText, this.onChangeQuery)
  },
  methods: {
    onChangeQuery (val) {
      this.$router.push({ name: 'episode', query: val === '' ? {} : { q: val } })
    }
  }
}
