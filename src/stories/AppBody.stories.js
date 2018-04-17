import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import AppBody from '~/components/AppBody.vue'

storiesOf('AppBody', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add(
    'default',
    withNotes(`WIP`)(() => {
      return {
        template: `<AppBody class="app_body" />`,
        components: { AppBody },
        render: (h) => h(AppBody)
      }
    })
  )
