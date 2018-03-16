<template>
  <div class="audio-control-button"
    :style="{
      width: buttonSize + 'px',
      height: buttonSize + 'px'
    }">
    <AudioPlayingIcon
      class="icon"
      :paused="paused"
    />
    <ProgressCircle
      :size="buttonSize"
      :strokeWidth="progressWidth"
      :progress="progress"
      class="progress"
    />
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import AudioPlayingIcon from '~/components/AudioPlayingIcon.vue'
import ProgressCircle from '~/components/ProgressCircle.vue'

export default {
  components: {
    AudioPlayingIcon,
    ProgressCircle
  },
  data() {
    return {
      buttonSize: 80,
      progressWidth: 5,
      isOptions: false
    }
  },
  computed: {
    ...mapState('audio', ['paused', 'duration', 'currentTime']),
    progress() {
      return this.currentTime / this.duration
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/_vars.scss';

$button-size: 100px;

.audio-control-button {
  background: $clr-main-d;
  border-radius: 50%;

  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-areas: 'stack';

  & > * {
    grid-area: stack;
  }

  .progress {
    transform: rotate(-90deg);
  }

  cursor: pointer;

  -webkit-tap-highlight-color: transparent;
}
</style>
