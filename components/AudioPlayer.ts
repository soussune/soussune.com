export default {
  props: {
    audioURL: { type: String, required: true }
  },
  filters: {
    time (val) {
      return [ Math.floor(val / 3600), Math.floor((val % 3600) / 60), Math.round(val % 60) ]
        .map((v) => v.toString().padStart(2, '0'))
        .join(':')
    }
  },
  data () {
    return {
      currentTime2: 0,
      au: undefined,
      loadedmetadata: false,
      duration: 0,
      paused: true
    }
  },
  computed: {
    currentTime: {
      get () {
        return this.currentTime2
      },
      set (val) {
        console.log(val)
        this.au.currentTime = val
      }
    }
  },
  mounted () {
    const au = (this.au = new Audio(this.audioURL))
    au.preload = 'metadata'
    au.addEventListener('loadedmetadata', (e) => {
      this.duration = au.duration
    })
    au.addEventListener('timeupdate', (e) => {
      this.currentTime2 = au.currentTime
    })
    au.addEventListener('pause', (e) => {
      this.paused = au.paused
    })
    au.addEventListener('play', (e) => {
      this.paused = au.paused
    })
  },
  methods: {
    togglePlay () {
      this.paused ? this.au.play() : this.au.pause()
    }
  }
}
