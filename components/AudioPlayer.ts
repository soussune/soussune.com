import { mapState } from 'vuex'

export default {
  data () {
    return {
      audio: undefined
    }
  },
  computed: {
    src () {
      return this.$store.state.audio.src
    }
  },
  mounted () {
    const au = (this.audio = this.$refs.audio)
    au.autoplay = true

    // bind audio value
    au.addEventListener('loadedmetadata', this.onLoadedmetadata)
    au.addEventListener('volumechange', this.volumechange)
    au.addEventListener('progress', this.onProgress)
    au.addEventListener('timeupdate', this.onTimeupdate)
    au.addEventListener('pause', this.onPlayPauseChange)
    au.addEventListener('play', this.onPlayPauseChange)
    au.addEventListener('playing', this.onPlaying)

    // bind store value
    this.bind('paused', this.onChangePaused)
    this.bind('seekTo', this.onChangeSeek)

    const props = [ 'volume', 'playbackRate', 'muted' ]
    props.forEach((p) => this.bind(p))
  },
  beforeDestroy () {
    const au = this.audio
    au.pause()

    au.removeEventListener('loadedmetadata', this.onLoadedmetadata)
    au.removeEventListener('volumechange', this.volumechange)
    au.removeEventListener('progress', this.onProgress)
    au.removeEventListener('timeupdate', this.onTimeupdate)
    au.removeEventListener('pause', this.onPlayPauseChange)
    au.removeEventListener('play', this.onPlayPauseChange)
  },
  methods: {
    bind (prop, cb) {
      this.$store.watch(this.$store.getters[`audio/${prop}`], (val) => (cb ? cb(val) : (this.audio[prop] = val)))
    },
    commit (prop, payload) {
      this.$store.commit(`audio/${prop}`, payload)
    },
    onLoadedmetadata () {
      this.commit('duration', this.audio.duration)
    },
    onVolumechange () {
      this.commit('volume', this.audio.volume)
    },
    onPlayPauseChange () {
      this.commit('paused', this.audio.paused)
    },
    onPlaying (e) {
      this.commit('playing', false)
    },
    onProgress () {
      this.updateProgress()
    },
    onTimeupdate () {
      this.commit('currentTime', this.audio.currentTime)
      this.updateProgress()
    },
    updateProgress () {
      const b = this.audio.buffered
      if (b.length === 0) return
      this.$store.commit('audio/buffered', b.end(b.length - 1))
    },
    onChangeSeek (val) {
      this.commit('playing', true)
      this.audio.currentTime = val
    },
    onChangePaused (val) {
      val ? this.audio.pause() : this.audio.play()
    }
  }
}
