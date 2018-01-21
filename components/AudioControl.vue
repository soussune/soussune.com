<template>
  <transition name="container">
    <div
      class="audio-control-container"
      v-if="isShown"
    >
      <div
        class="bg"
        v-if="isOptionsShown"
        @click="toggleOption"
      />
      <transition name="options">
        <AudioControlOptions
          v-if="isOptionsShown"
          class="options"
        />
      </transition>
      <AudioControlButton
        class="button"
        @click.native="toggleOption"
      />
    </div>
  </transition>
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
      isOptionsShown: false
    }
  },
  computed: {
    ...mapState('audio', ['src']),
    isShown() {
      return this.src !== ''
    }
  },
  methods: {
    toggleOption() {
      this.isOptionsShown = !this.isOptionsShown
    }
  }
}
</script>

<style lang="scss" scoped>
$ios-safari-bottom-margin: 80px;

.audio-control-container {
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  z-index: 1000;
}
.container-enter-active,
.container-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.container-enter,
.container-leave-to {
  transform: translateY(200px);
  opacity: 0;
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
}
.options-enter-active,
.options-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.options-enter,
.options-leave-to {
  transform: translateY(100px);
  opacity: 0;
}
.button {
  position: absolute;
  right: 10px;
  bottom: $ios-safari-bottom-margin;
}
</style>
