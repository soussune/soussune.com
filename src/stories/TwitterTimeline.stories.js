import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import { withScreenshot } from 'storybook-chrome-screenshot'
import { viewports } from './viewports'
import TwitterTimeline from '~/components/TwitterTimeline.vue'

storiesOf('TwitterTimeline', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    withNotes(`WIP`)(
      withScreenshot({
        viewport: Object.values(viewports)
      })(() => {
        return {
          template: `<TwitterTimeline />`,
          components: { TwitterTimeline },
          render: (h) => h(TwitterTimeline)
        }
      })
    )
  )
