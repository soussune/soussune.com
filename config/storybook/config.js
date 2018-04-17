import { configure } from '@storybook/vue'
import { setOptions } from '@storybook/addon-options'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

setOptions({
  hierarchyRootSeparator: /\|/
})

function loadStories() {
  const req = require.context('../../src/stories', true, /\.stories\.js$/)
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module)
