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
  mounted () {
    this.$store.watch((state) => state.actors, this.updateActor)
  },
  methods: {
    updateActor () {
      this.actor = this.$store.getters.actorByPath(this.$route.path)
    }
  },
  head () {
    return {
      title: this.actor.title
    }
  }
}
