import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import AppFooter from '~/components/AppFooter.vue'

storiesOf('AppFooter', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add(
    'default',
    withNotes(`WIP`)(() => {
      return {
        template: `<AppFooter class="app_footer" />`,
        components: { AppFooter },
        render: (h) => h(AppFooter)
      }
    })
  )
