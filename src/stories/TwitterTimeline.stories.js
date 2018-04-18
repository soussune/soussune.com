import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import { withScreenshot } from 'storybook-chrome-screenshot'
import TwitterTimeline from '~/components/TwitterTimeline.vue'

storiesOf('TwitterTimeline', module)
  .addDecorator(withKnobs)
  .addDecorator(withScreenshot())
  .add(
    'default',
    withNotes(`WIP`)(() => {
      return {
        template: `<TwitterTimeline />`,
        components: { TwitterTimeline },
        render: (h) => h(TwitterTimeline)
      }
    })
  )
