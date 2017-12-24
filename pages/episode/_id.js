import { DateTime } from 'luxon'
import * as EpisodeHelper from '~/helpers/EpisodeHelper.js'

export default {
  filters: {
    date (episode) {
      return DateTime.fromMillis(episode.published).toFormat('yyyy年MM月dd日')
    },
    desc (episode) {
      return EpisodeHelper.desc(episode)
    }
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
  head () {
    return {
      title: this.episode.title
    }
  },
  mounted () {
    this.loadTwitterWidget()
  },
  updated () {
    this.loadTwitterWidget()
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
    },
    loadTwitterWidget () {
      // Reload twitter widget for this episode when already loaded on root
      if (window['twttr']) window['twttr'].widgets.load(this.$refs.content)
    }
  }
}
