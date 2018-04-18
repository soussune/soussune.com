import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import { withScreenshot } from 'storybook-chrome-screenshot'
import FeedbackTweet from '~/components/FeedbackTweet.vue'

storiesOf('FeedbackTweet', module)
  .addDecorator(withKnobs)
  .addDecorator(withScreenshot())
  .add(
    'default',
    withNotes(`WIP`)(() => {
      return {
        template: `<FeedbackTweet />`,
        components: { FeedbackTweet },
        render: (h) => h(FeedbackTweet)
      }
    })
  )
