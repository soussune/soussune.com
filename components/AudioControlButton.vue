<template>
  <div class="button">
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
$base-bg-color: #2f2921;
$base-text-color: #fff;
$button-size: 60px;

.button {
  background: $base-bg-color;
  border-radius: 50%;
  width: $button-size;
  height: $button-size;

  display: grid;
  justify-items: center;
  align-items: center;

  cursor: pointer;

  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>
