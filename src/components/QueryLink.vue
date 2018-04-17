<template>
  <a
    :href="href"
    :target="target"
    :rel="rel"
  ><slot/></a>
</template>

<script>
export default {
  props: {
    path: { type: String, default: '' },
    params: { type: Object, default: () => {} },
    target: { type: String, default: '_blank' }
  },
  computed: {
    rel() {
      return this.target === '_blank' ? 'noopener' : ''
    },
    href() {
      const q = Object.keys(this.params)
        .map(
          (key) =>
            this.params[key] && this.params[key] !== ''
              ? `${key}=${encodeURIComponent(this.params[key])}`
              : undefined
        )
        .filter((item) => item)
        .join('&')
      return q === '' ? this.path : `${this.path}?${q}`
    }
  }
}
</script>
