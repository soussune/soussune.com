export default {
  computed: {
    actor () {
      return this.$store.getters.actorByPath(this.$route.path)
    }
  },
  head () {
    return {
			title: this.actor.title
		}
  }
}
