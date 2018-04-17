import Vue from 'vue'
import { action } from '@storybook/addon-actions'
import '~/plugins/content-loader'
import '~/plugins/vue-awesome'
import '~/plugins/vue-lazyload'
import '~/plugins/vue-notifications'

import '~/assets/css/reset.scss'
import '~/assets/css/style.scss'
import '~/assets/css/marked.scss'
import '~/assets/css/pageTrans.scss'

Vue.component('RouterLink', {
  props: ['to'],
  methods: {
    log() {
      action('link target')(this.to)
    }
  },
  template: '<a @click="log()"><slot>RouterLink</slot></a>'
})

Vue.component('NuxtLink', {
  props: ['to'],
  methods: {
    log() {
      action('link target')(this.to)
    }
  },
  template: '<a @click="log()"><slot>NuxtLink</slot></a>'
})
