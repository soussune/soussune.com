<template>
  <div>
    <div v-if="au">
      <button
        class="play"
        @click="togglePlay"
        :disabled="!loaded"
      >
        {{ au.paused ? '▶' : '■'}}
      </button>
      <p>{{currentTime_ | time}} / {{duration | time}}</p>
      <div class="currentTime">
        <div
          class="buffered"
          :style="{ width: `${buffered / duration * 100}%`}"
        ></div>
        <input
          type="range"
          step="any"
          min="0"
          :max="duration"
          v-model.number="currentTime_"
          @input="au.currentTime = $event.target.value"
          :disabled="!loaded"
        >
      </div>
      <span>
        <button
          @click="toggleMute"
        >
        mute
        </button>
        <input
          class="volume"
          type="range"
          step="any"
          min="0"
          max="1"
          v-model.number="volume_"
          @input="au.volume = $event.target.value"
          :disabled="au.muted"
        >
        {{ volume_.toFixed(1) }}
      </span>
      <input
        class="playbackRate"
        type="range"
        step="any"
        min="1"
        max="3"
        v-model.number="playbackRate_"
        @input="au.playbackRate = $event.target.value"
      >
      x {{ playbackRate_.toFixed(1) }}
    </div>
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
.currentTime{
  background: #555;
  position: relative;

  $sliderHeight: 32px;
  height: $sliderHeight;

  & > * {
    position: absolute;
    height: 100%;
  }

  & .buffered {
    background: #ffd261;
    transition: all .5s cubic-bezier(.55, 0, .1, 1);
  }

  & input {
    -webkit-appearance: none;
    width: 100%;
    border: none;
    background: none;

    &:focus {
      outline: none;
    }
    &::-webkit-slider-thumb {
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
      border: 1px solid #000000;
      height: $sliderHeight;
      width: 20px;
      border-radius: 3px;
      background: #ffffff;
      cursor: pointer;
      -webkit-appearance: none;
    }
    &::-moz-range-thumb {
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
      border: 1px solid #000000;
      height: $sliderHeight;
      width: 20px;
      border-radius: 3px;
      background: #ffffff;
      cursor: pointer;
    }
    &::-ms-thumb {
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
      border: 1px solid #000000;
      height: $sliderHeight;
      width: 20px;
      border-radius: 3px;
      background: #ffffff;
      cursor: pointer;
      height: 20px;
    }
  }
}



</style>
