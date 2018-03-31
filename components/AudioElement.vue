<template>
  <div>
    <audio ref="audio"/>
  </div>
</template>

<script lang="ts">
let au

export default {
  mounted() {
    au = this.$refs.audio
    this.commit('audioElement', au)

    // bind audio value
    au.addEventListener('loadedmetadata', this.onLoadedmetadata)
    au.addEventListener('volumechange', this.volumechange)
    au.addEventListener('progress', this.onProgress)
    au.addEventListener('timeupdate', this.onTimeupdate)
    au.addEventListener('pause', this.onPlayPauseChange)
    au.addEventListener('play', this.onPlayPauseChange)
    au.addEventListener('canplay', this.onCanplay)
    au.addEventListener('seeked', this.onCanplay)
  },
  beforeDestroy() {
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
    commit(prop, payload) {
      this.$store.commit(`audio/${prop}`, payload)
    },
    onLoadedmetadata() {
      this.commit('duration', au.duration)
    },
    onVolumechange() {
      this.commit('volume', au.volume)
    },
    onProgress() {
      this.updateProgress()
    },
    onTimeupdate() {
      this.commit('currentTime', au.currentTime)
      this.updateProgress()
    },
    onPlayPauseChange() {
      this.commit('paused', au.paused)
    },
    onCanplay() {
      this.commit('canplay', true)
    },
    updateProgress() {
      const b = au.buffered
      if (b.length === 0) return
      this.commit('buffered', b.end(b.length - 1))
    }
  }
}
</script>
