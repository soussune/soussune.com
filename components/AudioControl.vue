<template>
  <transition name="container">
    <div
      class="audio-control-container"
      v-if="isShown"
    >
      <div
        v-if="isOptionsShown"
        class="bg"
        @click="closeOption"
      />
      <transition name="options">
        <div v-if="isOptionsShown">
          <AudioControlOptions
            class="options"
            @close="closeOption"
          />
          <button
            class="clearPlay"
            @click="clearPlay"
            aria-label="clear play"
          >
            再生を終了する
          </button>
        </div>
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
    clearPlay() {
      this.$store.commit('audio/src', '')
      this.isOptionsShown = false
    },
    closeOption() {
      this.isOptionsShown = false
    },
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
  background: rgba(0, 0, 0, 0.8);
  width: 100vw;
  height: 150vh;
}
.clearPlay {
  position: absolute;
  bottom: $ios-safari-bottom-margin;
  left: 50%;
  transform: translate(-50%, -10px);
  font-size: 1.1rem;
  background: transparent;
  border: none;

  color: $clr-white-dd;
  padding: 0.5rem;

  @include mq() {
    font-size: 0.9rem;
  }
}

.options {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
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
