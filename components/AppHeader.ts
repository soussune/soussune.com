import AppLogo from '~/components/AppLogo.vue'

export default {
  components: {
    AppLogo
  },
  methods: {
    updateInput (e) {
      this.$store.commit('searchText', e.target.value)
    },
    onBlur () {
      this.onEdit = false
    },
    onFocus () {
      this.onEdit = true
    }
  },
  data () {
    return {
      onEdit: false
    }
  },
  computed: {
    focused () {
      return this.onEdit || this.$store.state.searchText !== ''
    }
  },
  methods: {
    subscribe: function(){
      this.$OneSignal.push(["registerForPushNotifications"]);
    }
  },
  directives: {
    imeInput: {
      bind (el, binding, vnode) {
        let onComposition = false
        el.addEventListener('compositionstart', () => {
          onComposition = true
        })
        el.addEventListener('compositionend', (e) => {
          onComposition = false
          binding.value = e.target.value
          vnode.context.$set(vnode.context, binding.expression, e.target.value)
        })
        el.addEventListener('input', (e) => {
          if (onComposition) return
          vnode.context.$set(vnode.context, binding.expression, e.target.value)
        })
      }
    }
  }
}
