export default {
  props: {
    audioURL: { type: String, required: true },
    volume: { type: Number, default: 1 },
    playbackRate: { type: Number, default: 1 },
    currentTime: { type: Number, default: 0 }
  },
  filters: {
    time (val: number) {
      return [ Math.floor(val / 3600), Math.floor((val % 3600) / 60), Math.round(val % 60) ]
        .map((v) => v.toString().padStart(2, '0'))
        .join(':')
    }
  },
  data () {
    return {
      au: undefined,
      duration: 0,
      currentTime_: 0,
      volume_: 1,
      playbackRate_: 1,
      buffered: 0
    }
  },
  computed: {
    loaded (): boolean {
      return 0 < this.duration
    }
  },
  watch: {
    // bind prop values
    currentTime (val: number) {
      console.log('c', val)
      this.currentTime_ = this.au.currentTime = val
    },
    volume (val: number) {
      this.volume_ = this.au.volume = val
    },
    playbackRate (val: number) {
      this.playbackRate_ = this.au.playbackRate = val
    }
  },
  mounted () {
    const au = (this.au = new Audio(this.audioURL))
    au.preload = 'metadata'

    // bind audio values
    au.addEventListener('loadedmetadata', () => (this.duration = au.duration))
    au.addEventListener('timeupdate', () => {
      this.currentTime_ = au.currentTime
      this.updateProgress()
    })
    au.addEventListener('volumechange', () => (this.volume_ = au.muted ? 0 : au.volume))
    au.addEventListener('progress', this.updateProgress)
  },
  methods: {
    updateProgress () {
      const b = this.au.buffered
      if (b.length === 0) return
      this.buffered = b.end(b.length - 1)
    },
    togglePlay () {
      this.au.paused ? this.au.play() : this.au.pause()
    },
    toggleMute () {
      this.au.muted = !this.au.muted
    }
  }
}
