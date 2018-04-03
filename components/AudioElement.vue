<template>
  <div>
    <audio ref="audio"/>
  </div>
</template>

<script lang="ts">
export default {
  mounted() {
    const au = this.$refs.audio
    this.commit('audioElement', au)

    // bind audio value
    au.addEventListener('loadedmetadata', this.onLoadedmetadata)
    au.addEventListener('volumechange', this.onVolumeChange)
    au.addEventListener('progress', this.onProgress)
    au.addEventListener('timeupdate', this.onTimeupdate)
    au.addEventListener('pause', this.onPlayPauseChange)
    au.addEventListener('play', this.onPlayPauseChange)
    au.addEventListener('canplay', this.onCanplay)
    au.addEventListener('seeked', this.onCanplay)
  },
  beforeDestroy() {
    const au = this.$refs.audio

    au.removeEventListener('loadedmetadata', this.onLoadedmetadata)
    au.removeEventListener('volumechange', this.onVolumeChange)
    au.removeEventListener('progress', this.onProgress)
    au.removeEventListener('timeupdate', this.onTimeupdate)
    au.removeEventListener('pause', this.onPlayPauseChange)
    au.removeEventListener('play', this.onPlayPauseChange)
    au.removeEventListener('canplay', this.onCanplay)
    au.removeEventListener('seeked', this.onCanplay)
  },
  methods: {
    commit(prop, payload) {
      this.$store.commit(`audio/${prop}`, payload)
    },
    onLoadedmetadata(e) {
      this.commit('duration', e.target.duration)
    },
    onVolumeChange(e) {
      this.commit('volume', e.target.volume)
    },
    onProgress(e) {
      this.updateProgress(e)
    },
    onTimeupdate(e) {
      this.commit('currentTime', e.target.currentTime)
      this.updateProgress(e)
    },
    onPlayPauseChange(e) {
      this.commit('paused', e.target.paused)
    },
    onCanplay() {
      this.commit('canplay', true)
    },
    updateProgress(e) {
      const b = e.target.buffered
      if (b.length === 0) return
      this.commit('buffered', b.end(b.length - 1))
    }
  }
}
</script>
