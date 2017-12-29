import ActorIcon from '~/components/ActorIcon.vue'

export default {
  components: {
    ActorIcon
  },
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
