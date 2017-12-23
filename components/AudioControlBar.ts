export default {
  filters: {
    time (val: number) {
      return [ Math.floor(val / 3600), Math.floor((val % 3600) / 60), Math.round(val % 60) ]
        .map((v) => v.toString().padStart(2, '0'))
        .join(':')
    }
  },
  data () {
    return {
      skipBack: -15,
      skipFwd: 15
    }
  },
  methods: {
    commit (prop, payload) {
      this.$store.commit(`audio/${prop}`, payload)
    },
    skip (val) {
      this.commit('seekTo', this.currentTime + val)
    }
  },
  computed: {
    loaded (): boolean {
      return 0 < this.duration
    },
    duration () {
      return this.$store.state.audio.duration
    },
    buffered () {
      return this.$store.state.audio.buffered
    },
    title () {
      return this.$store.state.audio.title
    },
    currentTime: {
      get () {
        return this.$store.state.audio.currentTime
      },
      set (val: number) {
        this.commit('seekTo', val)
      }
    },
    volume: {
      get () {
        return this.$store.state.audio.volume
      },
      set (val: number) {
        this.commit('volume', val)
      }
    },
    playbackRate: {
      get () {
        return this.$store.state.audio.playbackRate
      },
      set (val: number) {
        this.commit('playbackRate', val)
      }
    },
    paused: {
      get () {
        return this.$store.state.audio.paused
      },
      set (val: number) {
        this.commit('paused', val)
      }
    },
    muted: {
      get () {
        return this.$store.state.audio.muted
      },
      set (val: number) {
        this.commit('muted', val)
      }
    }
  }
}
