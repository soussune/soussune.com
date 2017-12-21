import { DateTime } from 'luxon'
import * as EpisodeHelper from '~/helpers/EpisodeHelper.js'
import AudioPlayer from '~/components/AudioPlayer.vue'

export default {
  components: {
    AudioPlayer
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
  computed: {
    audioURL () {
      return 'https://cdn.soussune.com/audio' + this.episode.audioFilePath
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
