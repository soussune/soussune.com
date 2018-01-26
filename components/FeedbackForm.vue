<template>
  <QueryLink
    path='https://docs.google.com/forms/d/e/1FAIpQLSe4p8EuJIocQ_PJl7qe-lZ--pD7AN3LCk4FefDW0DmSBTBHIA/viewform'
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
    entryTitle: { type: String, default: undefined }
  },
  computed: {
    params() {
      return {
        usp: 'sf_link',
        'entry.286431956': this.entryTitle
      }
    }
  }
}
</script>
