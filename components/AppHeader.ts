export default {
  data () {
    return {
      searchText: ''
    }
  },
  watch: {
    searchText (val) {
      this.$store.commit('searchText', val)
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
