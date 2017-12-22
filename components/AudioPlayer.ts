import { mapState } from 'vuex'

export default {
  data () {
    return {
      audio: undefined
    }
  },
  computed: {
    src () {
      console.log(this.$store.state.audio.src, this.audio && this.audio.src)
      return this.$store.state.audio.src
    }
  },
  mounted () {
    const au = (this.audio = this.$refs.audio)

    // bind audio value
    au.addEventListener('loadedmetadata', this.onLoadedmetadata)
    au.addEventListener('volumechange', this.volumechange)
    au.addEventListener('progress', this.onProgress)
    au.addEventListener('timeupdate', this.onTimeupdate)

    // bind store value
    this.bind('paused', this.onChangePaused)
    this.bind('seekTo', this.onChangeSeek)

    const props = [ 'volume', 'playbackRate', 'muted' ]
    props.forEach((p) => this.bind(p))
  },
  beforeDestroy () {
    const au = this.audio
    this.commit('paused', true)
    au.removeEventListener('loadedmetadata', this.onLoadedmetadata)
    au.removeEventListener('volumechange', this.volumechange)
    au.removeEventListener('progress', this.onProgress)
    au.removeEventListener('timeupdate', this.onTimeupdate)
    // delete this.audio
  },
  methods: {
    onLoadedmetadata () {
      this.commit('duration', this.audio.duration)
    },
    onVolumechange () {
      this.commit('volume', this.audio.volume)
    },
    onProgress () {
      this.updateProgress()
    },
    onTimeupdate () {
      this.commit('currentTime', this.audio.currentTime)
      this.updateProgress()
    },
    bind (prop, cb) {
      this.$store.watch(this.$store.getters[`audio/${prop}`], (val) => (cb ? cb(val) : (this.audio[prop] = val)))
    },
    commit (prop, payload) {
      this.$store.commit(`audio/${prop}`, payload)
    },
    updateProgress () {
      const b = this.audio.buffered
      if (b.length === 0) return
      this.$store.commit('audio/buffered', b.end(b.length - 1))
    },
    onChangeSeek (val) {
      this.audio.currentTime = val
    },
    onChangePaused (val) {
      val ? this.audio.pause() : this.audio.play()
    }
  }
}
