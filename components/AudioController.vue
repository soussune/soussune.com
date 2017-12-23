<template>
  <div>
    <div class="play">
      <button
        @click="skip(skipBack)"
        class="skip"
        :disabled="!loaded"
      >
        «
      </button>
      <button
        class="pause"
        @click="paused = !paused"
        :disabled="!loaded"
      >
        {{ paused ? '▶' : '■' }}
      </button>
      <button
        @click="skip(skipFwd)"
        class="skip"
        :disabled="!loaded"
      >
        »
      </button>
    </div>
    <div>
      <span>{{currentTime | time}} / {{duration | time}}</span>
      <span>
        <button
          @click="muted = !muted"
          class="mute"
        >
        🔊
        </button>
        <input
          class="volume"
          type="range"
          step="any"
          min="0"
          max="1"
          v-model.number="volume"
          :disabled="muted"
        >
        {{ volume.toFixed(1) }}
      </span>
      <input
        class="playbackRate"
        type="range"
        step="any"
        min="1"
        max="3"
        v-model.number="playbackRate"
      >
      x {{ playbackRate.toFixed(1) }}


    </div>
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
        v-model.number="currentTime"
        :disabled="!loaded"
      >
    </div>

    <!-- <a :href="audioURL" download>download</a> -->
  </div>
</template>

<script src="./AudioController.ts" lang="ts">
</script>

<style lang="scss" scoped>
.play {
  text-align: center;

  & button {
    // border: none;
  }
  .skip {
    width: 50px;
    height: 50px;
    font-size: 30px;
    border-radius: 50px;
    outline: 0;
  }
  .pause {
    width: 100px;
    height: 50px;
    font-size: 30px;
    border-radius: 50px;
    outline: 0;
  }
}
.mute {
  width: 40px;
  height: 30px;
  font-size: 20px;
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
