import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import AppLogo from '~/components/AppLogo.vue'

storiesOf('AppLogo', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add(
    'default',
    withNotes(`WIP`)(() => {
      return {
        template: `<AppLogo />`,
        components: { AppLogo },
        render: (h) => h(AppLogo)
      }
    })
  )
