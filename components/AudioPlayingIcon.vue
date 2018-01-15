// https://codepen.io/russgossett/pen/zGxrYJ

<template>
  <div class="bars" title="playing">
    <div
      v-for="(duration, i) in durations"
      :key="i"
      :style="{ 'animation-duration': `${duration}s` }"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      durations: [0.4, 0.2, 1, 0.3]
    }
  }
}
</script>

<style lang="scss">
.bars {
  display: grid;
  grid-template-columns: 0.3em 0.3em 0.3em 0.3em;
}

.bars > * {
  background: slategray;
  background: #fff;
  width: 3px;
  transform-origin: bottom;
  animation: sound 1s cubic-bezier(0.17, 0.37, 0.43, 0.67) infinite alternate;
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
