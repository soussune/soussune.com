// https://codepen.io/russgossett/pen/zGxrYJ

<template>
  <div
    class="bars"
    title="playing"
    :class="{paused}"
  >
    <div
      v-for="(duration, i) in durations"
      ref="bars"
      :key="i"
      :style="{
        'animation-duration': `${duration}s`,
      }"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      durations: [0.4, 0.2, 1, 0.3]
    }
  },
  props: {
    paused: { type: Boolean, default: false }
  },
  watch: {
    paused(val) {
      if (!val) return

      // Keep animation state for iOS
      // https://stackoverflow.com/questions/27362216/webkit-animation-play-state-not-working-on-ios-8-1-probably-lower-too
      this.$refs.bars.forEach(bar => {
        const s = window.getComputedStyle(bar)
        bar.style.opacity = s.opacity
        bar.style.transform = s.transform
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bars {
  display: grid;
  height: 1em;
  grid-template-columns: 0.3em 0.3em 0.3em 0.3em;
}

.bars > * {
  background: slategray;
  background: #fff;
  width: 3px;
  transform-origin: bottom;
  animation: sound 1s cubic-bezier(0.17, 0.37, 0.43, 0.67) infinite alternate;
}
.bars.paused > * {
  animation: none !important;
}

@keyframes sound {
  0% {
    opacity: 0.35;
    transform: scaleY(0.1);
  }
  100% {
    opacity: 1;
    transform: scaleY(1);
  }
}
</style>
