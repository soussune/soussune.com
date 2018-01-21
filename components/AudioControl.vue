<template>
  <div
    class="audio-control-container"
    :class="{ isHidden, isOptionsHidden }"
  >
    <div
      class="bg"
      v-if="!isOptionsHidden"
      @click="toggleOption"
    ></div>
    <AudioControlOptions
      class="options"
    />
    <AudioControlButton
      class="button"
      @click.native="toggleOption"
    />
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import AudioControlButton from '~/components/AudioControlButton.vue'
import AudioControlOptions from '~/components/AudioControlOptions.vue'

export default {
  components: {
    AudioControlButton,
    AudioControlOptions
  },
  data() {
    return {
      isOptionsHidden: true
    }
  },
  computed: {
    ...mapState('audio', ['src']),
    isHidden() {
      return this.src === ''
    }
  },
  methods: {
    toggleOption() {
      this.isOptionsHidden = !this.isOptionsHidden
    }
  }
}
</script>

<style lang="scss" scoped>
$ios-safari-bottom-margin: 80px;

.audio-control-container {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);

  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;

  &.isHidden {
    transform: translateY(200px);
    opacity: 0;
  }
}

.bg {
  background: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100vh;
}

.options {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  position: absolute;
  bottom: $ios-safari-bottom-margin + 70px;

  .isOptionsHidden & {
    transform: translateY(100px);
    opacity: 0;
  }
}
.button {
  position: absolute;
  right: 10px;
  bottom: $ios-safari-bottom-margin;
}
</style>
