import { DateTime } from 'luxon'
import * as EpisodeHelper from '~/helpers/EpisodeHelper.js'
import AudioPlayer from '~/components/AudioPlayer.vue'
import AudioController from '~/components/AudioController.vue'

export default {
  components: {
    AudioPlayer,
    AudioController
  },
  methods: {
    commit (prop, payload) {
      this.$store.commit(`audio/${prop}`, payload)
    },
    togglePlay () {
      if (this.selected) {
        this.commit('paused', !this.paused)
        return
      }

      this.commit('src', this.src)
      this.commit('title', this.episode.title)
    }
  },
  computed: {
    src () {
      return 'https://cdn.soussune.com/audio' + this.episode.audioFilePath
    },
    playing () {
      return this.selected && !this.paused
    },
    canplay () {
      return this.$store.state.audio.canplay
    },
    selected () {
      return this.$store.state.audio.src === this.src
    },
    paused () {
      return this.$store.state.audio.paused
    }
  },
  mounted () {
    // Load twitter widget on SPA mode
    if (window['twttr']) window['twttr'].widgets.load(this.$refs.content)
  },
  asyncData ({ store, route }) {
    const episode = store.getters.episodeByPath(route.path)
    return {
      episode: {
        ...episode,
        actors: episode.actorIds.map((actorId) => store.getters.actorById(actorId))
      }
    }
  },
  filters: {
    date (episode) {
      return DateTime.fromMillis(episode.published).toFormat('yyyy年MM月dd日')
    },
    desc (episode) {
      return EpisodeHelper.desc(episode)
    }
  },
  head () {
    return {
      title: this.episode.title
    }
  }
}
