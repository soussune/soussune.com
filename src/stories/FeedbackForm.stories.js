import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import { withScreenshot } from 'storybook-chrome-screenshot'
import { viewports } from './viewports'
import FeedbackForm from '~/components/FeedbackForm.vue'

storiesOf('FeedbackForm', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    withNotes(`WIP`)(
      withScreenshot({
        viewport: Object.values(viewports)
      })(() => {
        return {
          template: `<FeedbackForm />`,
          components: { FeedbackForm },
          render: (h) => h(FeedbackForm)
        }
      })
    )
  )
