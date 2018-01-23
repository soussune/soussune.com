<template>
  <div class="audio-control-button">
    <AudioPlayingIcon
      class="icon"
      :paused="paused"
    />
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import AudioPlayingIcon from '~/components/AudioPlayingIcon.vue'

export default {
  components: {
    AudioPlayingIcon
  },
  data() {
    return {
      count: 0,
      isOptions: false
    }
  },
  computed: {
    ...mapState('audio', ['paused'])
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/_vars.scss';

$button-size: 60px;

.audio-control-button {
  background: $clr-main-d;
  border-radius: 50%;
  width: $button-size;
  height: $button-size;

  display: grid;
  justify-items: center;
  align-items: center;

  cursor: pointer;

  -webkit-tap-highlight-color: transparent;
}
</style>
