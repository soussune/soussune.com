<template>
  <div>
    <button
      class="play"
      @click="togglePlay"
    >
      {{ paused ? '▶' : '■'}}
    </button>
    <p>{{currentTime | time}}</p>
    <p>{{duration | time}}</p>
    <input
      class="range"
      type="range"
      min="0"
      step="any"
      :max="duration"
      v-model="currentTime"
    >
    <a :href="audioURL" download>download</a>
  </div>
</template>

<script src="./AudioPlayer.ts" lang="ts">
</script>

<style lang="scss" scoped>
.play {
  width: 100px;
  height: 100px;
  font-size: 50px;
  border-radius: 10px;
  outline: 0;
}
.range {
  width: 100%;
}

</style>
