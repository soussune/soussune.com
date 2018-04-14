import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import AppHeader from '~/components/AppHeader.vue'

storiesOf('AppHeader', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add(
    'default',
    withNotes(`WIP`)(() => {
      return {
        template: `<AppHeader class="app_header" />`,
        components: { AppHeader },
        render: (h) => h(AppHeader)
      }
    })
  )
