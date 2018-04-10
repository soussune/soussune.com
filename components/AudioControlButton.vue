<template>
  <div class="audio-control-button"
    :style="{
      width: buttonSize,
      height: buttonSize
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

<script>
import { mapState, mapGetters } from 'vuex'
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
    ...mapState('audio', ['paused']),
    ...mapGetters('audio', ['progress'])
  }
}
</script>

<style lang="scss" scoped>
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
