<template>
  <audio ref="audio">
  </audio>
</template>

<script lang="ts">
export default {
  data() {
    return {
      audio: undefined
    }
  },
  mounted() {
    const au = (this.audio = this.$refs.audio)

    // bind audio value
    au.addEventListener('loadedmetadata', this.onLoadedmetadata)
    au.addEventListener('volumechange', this.volumechange)
    au.addEventListener('progress', this.onProgress)
    au.addEventListener('timeupdate', this.onTimeupdate)
    au.addEventListener('pause', this.onPlayPauseChange)
    au.addEventListener('play', this.onPlayPauseChange)
    au.addEventListener('canplay', this.onCanplay)
    au.addEventListener('seeked', this.onCanplay)

    // bind store value
    this.bind('paused', this.onChangePaused)
    this.bind('seekTo', this.onChangeSeek)
    this.bind('src', this.onChangeSrc)

    const props = ['volume', 'playbackRate', 'muted']
    props.forEach((p) => this.bind(p))
  },
  beforeDestroy() {
    const au = this.audio
    au.pause()

    au.removeEventListener('loadedmetadata', this.onLoadedmetadata)
    au.removeEventListener('volumechange', this.volumechange)
    au.removeEventListener('progress', this.onProgress)
    au.removeEventListener('timeupdate', this.onTimeupdate)
    au.removeEventListener('pause', this.onPlayPauseChange)
    au.removeEventListener('play', this.onPlayPauseChange)
    au.removeEventListener('canplay', this.onCanplay)
    au.removeEventListener('seeked', this.onCanplay)
  },
  methods: {
    bind(prop, cb) {
      this.$store.watch(
        this.$store.getters[`audio/${prop}`],
        (val) => (cb ? cb(val) : (this.audio[prop] = val))
      )
    },
    commit(prop, payload) {
      this.$store.commit(`audio/${prop}`, payload)
    },
    onLoadedmetadata() {
      this.commit('duration', this.audio.duration)
    },
    onVolumechange() {
      this.commit('volume', this.audio.volume)
    },
    onPlayPauseChange() {
      this.commit('paused', this.audio.paused)
    },
    onCanplay() {
      this.commit('canplay', true)
    },
    onProgress() {
      this.updateProgress()
    },
    onTimeupdate() {
      this.commit('currentTime', this.audio.currentTime)
      this.updateProgress()
    },
    updateProgress() {
      const b = this.audio.buffered
      if (b.length === 0) return
      this.$store.commit('audio/buffered', b.end(b.length - 1))
    },
    onChangeSeek(val) {
      this.commit('canplay', false)
      this.audio.currentTime = val
    },
    onChangePaused(val) {
      val ? this.audio.pause() : this.audio.play()
    },
    onChangeSrc(val) {
      this.commit('canplay', false)
      this.audio.src = val
      if (!val) {
        this.audio.pause()
        this.audio.currentTime = 0
      } else {
        this.audio.play()
      }
    }
  }
}
</script>
