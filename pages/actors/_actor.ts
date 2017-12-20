export default {
  computed: {
    actor () {
      return this.$store.getters.actorByPath(this.$route.path)
    }
  }
}
