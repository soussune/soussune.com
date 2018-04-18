import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import { withScreenshot } from 'storybook-chrome-screenshot'
import TwitterWidgets from '~/components/TwitterWidgets.vue'

storiesOf('TwitterWidgets', module)
  .addDecorator(withKnobs)
  .addDecorator(withScreenshot())
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
