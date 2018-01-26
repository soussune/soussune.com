<template>
  <QueryLink
    path='https://twitter.com/intent/tweet'
    :params='params'
  ><slot/></QueryLink>
</template>

<script>
import QueryLink from '~/components/QueryLink.vue'

export default {
  components: {
    QueryLink
  },
  props: {
    hashtags: { type: String, default: 'soussune' },
    url: { type: String, default: 'https://soussune.com' },
    text: { type: String, default: undefined }
  },
  computed: {
    params() {
      return {
        hashtags: this.hashtags,
        url: this.url,
        text: this.text
      }
    }
  }
}
</script>
