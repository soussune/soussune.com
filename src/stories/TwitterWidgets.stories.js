import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import TwitterWidgets from '~/components/TwitterWidgets.vue'

storiesOf('TwitterWidgets', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add(
    'default',
    withNotes(`WIP`)(() => {
      return {
        template: `<TwitterWidgets />`,
        components: { TwitterWidgets },
        render: (h) => h(TwitterWidgets)
      }
    })
  )
