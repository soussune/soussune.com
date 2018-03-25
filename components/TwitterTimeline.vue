<template>
  <TwitterWidgets>
    <a
      ref="timeline"
      :href="href"
      :data-widget-id="widgetId"
      class="twitter-timeline"
      target="_blank"
      rel="noopener"
    >{{q}} に関するツイート</a>
  </TwitterWidgets>
</template>

<script>
import TwitterWidgets from '~/components/TwitterWidgets.vue'
const twitterSearchBase = 'https://twitter.com/search?'

export default {
  components: {
    TwitterWidgets
  },
  props: {
    widgetId: { type: String, required: true },
    q: { type: String },
    rt: { type: Boolean, default: false }
  },
  computed: {
    href() {
      const q = this.q + (this.rt ? '' : ' -RT')
      return `${twitterSearchBase}q=${encodeURIComponent(q)}`
    }
  }
}
</script>
