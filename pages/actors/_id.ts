export default {
  asyncData ({ store, route }) {
    return {
      actor: store.getters.actorByPath(route.path)
    }
  },
  head () {
    return {
      title: this.actor.title
    }
  }
}
