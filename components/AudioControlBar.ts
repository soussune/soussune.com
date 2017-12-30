import { mapState } from 'vuex'

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
    },
    touchmove (e) {
      e.preventDefault()
      const cw = e.target.clientWidth
      const rate = Math.max(0, Math.min(cw, e.touches[0].pageX - e.target.offsetLeft)) / cw
      this.commit('seekTo', rate * this.duration)
    },
    togglePlay () {
      this.commit('paused', !this.paused)
    }
  },
  computed: {
    ...mapState(
      [ 'canplay', 'paused', 'duration', 'buffered', 'title' ].reduce(
        (map, prop) => ({ ...map, [prop]: (state) => state.audio[prop] }),
        {}
      )
    ),
    hide () {
      return this.$store.state.audio.src === ''
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
