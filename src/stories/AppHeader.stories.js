import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import AppHeader from '~/components/AppHeader.vue'

storiesOf('AppHeader', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add(
    'default',
    withNotes(`WIP`)(() => {
      const fixed = boolean('fixed', false)
      return {
        template: `<AppHeader class="app_header" :fixed=${fixed} />`,
        components: { AppHeader },
        render: (h) => h(AppHeader, { props: { fixed: fixed } })
      }
    })
  )
