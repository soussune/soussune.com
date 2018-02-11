<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    :style="{
      width: size,
      height: size
    }"
  >
    <circle
      :r="radius"
      :cx="halfSize"
      :cy="halfSize"
      :stroke-dasharray="dashArray"
      fill="transparent"
      :style="{
        'stroke-width': `${strokeWidth}px`
      }"
    ></circle>
    <circle
      class="bar"
      :r="radius"
      :cx="halfSize"
      :cy="halfSize"
      :stroke-dasharray="dashArray"
      fill="transparent"
      :style="{
        'stroke-width': `${strokeWidth}px`,
        'stroke-dashoffset': `${dashOffset}px`
      }"></circle>
  </svg>
</template>

<script lang="ts">
export default {
  props: {
    strokeWidth: { type: Number, default: 10 },
    progress: { type: Number, default: 0 },
    size: { type: Number, default: 100 }
  },
  computed: {
    halfSize() {
      return this.size * 0.5
    },
    radius() {
      return this.halfSize - this.strokeWidth * 0.5
    },
    dashArray() {
      return this.radius * 2 * Math.PI
    },
    dashOffset() {
      return this.dashArray * (1 - this.progress)
    }
  }
}
</script>

<style lang="scss" scoped>
svg circle {
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 0.1s;
  stroke: #666;

  &.bar {
    stroke: #ff9f1e;
  }
}
</style>
