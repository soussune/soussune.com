<template>
  <button
    @click="togglePlay"
    :class="{ playing, loading }"
    aria-label="toggle play"
  >
    <icon
      scale="3"
      :name="playing ? (loading ? 'spinner' : 'pause') : 'play'"
      :spin="loading"
    ></icon>
  </button>
</template>

<script lang="ts">
import { mapState, mapGetters } from 'vuex'

export default {
  props: {
    src: { type: String },
    title: { type: String }
  },
  computed: {
    ...mapState('audio', ['audioElement', 'paused', 'pagePath', 'canplay', 'paused']),
    ...mapState('audio', { selectedSrc: 'src' }),
    isSelected() {
      return this.selectedSrc === this.src
    },
    playing(): boolean {
      return this.isSelected && !this.paused
    },
    loading() {
      return this.isSelected && !this.canplay
    }
  },
  methods: {
    commit(prop: string, payload: any): void {
      this.$store.commit(`audio/${prop}`, payload)
    },
    togglePlay(): void {
      if (this.isSelected) {
        this.paused ? this.audioElement.play() : this.audioElement.pause()
        return
      }

      this.commit('initAudio', {
        src: this.src,
        title: this.title,
        pagePath: this.$route.path
      })

      this.audioElement.src = this.src
      this.audioElement.play()
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  transition: 0.4s ease-out;
  top: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  background: $clr-main-ll;
  color: $clr-white-ll;
  font-size: 18px;
  border: none;
  border-radius: 20%;
  width: 100px;
  height: 100px;
  outline: none;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  & > * {
    margin-left: 10px;
  }

  &.playing {
    border-radius: 5%;
    background: $clr-white-ll;
    color: $clr-black-l;
    border: $clr-white-dd 1px solid;
    animation: blink 3s infinite;
    & > * {
      margin-left: 0px;
    }

    @keyframes blink {
      50% {
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.4);
        opacity: 0.5;
      }
    }

    &.loading {
      border-radius: 15%;
      transform: scale(0.9);
    }
  }
}
</style>
