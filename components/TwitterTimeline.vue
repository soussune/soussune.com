<template>
  <a
    ref="timeline"
    :href="href"
    :data-widget-id="widgetId"
    class="twitter-timeline"
    target="_blank"
    rel="noopener"
  >{{q}} に関するツイート</a>
</template>

<script>
const twitterSearchBase = 'https://twitter.com/search?'
export default {
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
  },
  mounted() {
    this.loadTwitterWidget()
  },
  updated() {
    this.loadTwitterWidget()
  },
  methods: {
    loadTwitterWidget() {
      // Reload twitter widget for this episode when already loaded on root
      if (window['twttr']) window['twttr'].widgets.load(this.$refs.timeline)
    }
  }
}
</script>
