export default {
  methods: {
    updateInput (e) {
      this.$store.commit('searchText', e.target.value)
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
