import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import { withScreenshot } from 'storybook-chrome-screenshot'
import { viewports } from './viewports'
import FeedbackTweet from '~/components/FeedbackTweet.vue'

storiesOf('FeedbackTweet', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    withNotes(`WIP`)(
      withScreenshot({
        viewport: Object.values(viewports)
      })(() => {
        return {
          template: `<FeedbackTweet />`,
          components: { FeedbackTweet },
          render: (h) => h(FeedbackTweet)
        }
      })
    )
  )
