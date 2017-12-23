<template>
  <div class="container">
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
      <div class="title">{{ title }}</div>
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

<script src="./AudioControlBar.ts" lang="ts">
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
}
.title {
  text-align: center;
  width: 100%;
  color:#fff;
}
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
  }
}



</style>
