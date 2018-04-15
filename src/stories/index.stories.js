import Vue from 'vue'
import { action } from '@storybook/addon-actions'
import '~/plugins/content-loader'
import '~/plugins/vue-awesome'
import '~/plugins/vue-lazyload'
import '~/plugins/vue-notifications'

Vue.component('RouterLink', {
  props: ['to'],
  methods: {
    log() {
      action('link target')(this.to)
    }
  },
  template: '<div @click="log()"><slot>RouterLink</slot></div>'
  template: '<a @click="log()"><slot>RouterLink</slot></a>'
})

Vue.component('NuxtLink', {
  props: ['to'],
  methods: {
    log() {
      action('link target')(this.to)
    }
  },
  template: '<div @click="log()"><slot>NuxtLink</slot></div>'
  template: '<a @click="log()"><slot>NuxtLink</slot></a>'
})
