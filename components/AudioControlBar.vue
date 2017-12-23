<template>
  <div class="container" :class="{ hide: hide }">
    <div v-if="false">
      <div class="play">
        <button
          @click="skip(skipBack)"
          class="skip"
        >
          «
        </button>
        <button
          class="pause"
          @click="paused = !paused"
        >
          {{ paused ? '▶' : '■' }}
        </button>
        <button
          @click="skip(skipFwd)"
          class="skip"
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
    </div>
    <div class="currentTime">
      <div
        class="progress"
        :style="{ width: `${currentTime / duration * 100}%`}"
      ></div>
      <div class="title">{{ title }} [{{currentTime | time}} / {{duration | time}}]</div>
      <input
        type="range"
        step="any"
        min="0"
        :max="duration"
        v-model.number="currentTime"
      >
    </div>

    <!-- <a :href="audioURL" download>download</a> -->
  </div>
</template>

<script src="./AudioControlBar.ts" lang="ts">
</script>

<style lang="scss" scoped>
.container {
  transition: .5s cubic-bezier(.55, 0, .1, 1);

  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;

  &.hide {
    bottom: -50px;
  }
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
  background: #8c8c8c;
  position: relative;

  $sliderHeight: 40px;
  height: $sliderHeight;
  overflow: hidden;
  user-select: none;


  & > * {
    position: absolute;
    top: 0;
    bottom: 0;
  }

  & .progress {
    background: #ffd261;
    background: #43467f;
    transition: all .1s cubic-bezier(.55, 0, .1, 1);
    user-select: none;
  }

  & .title {
    left: 0;
    right: 0;
    margin: auto;

    text-align: center;
    color:#fff;
    user-select: none;
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
