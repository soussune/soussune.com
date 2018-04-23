import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import { withScreenshot } from 'storybook-chrome-screenshot'
import { viewports } from './viewports'
import ProgressCircle from '~/components/ProgressCircle.vue'

storiesOf('ProgressCircle', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    withNotes(`WIP`)(
      withScreenshot({
        viewport: Object.values(viewports)
      })(() => {
        return {
          template: `<ProgressCircle />`,
          components: { ProgressCircle },
          render: (h) => h(ProgressCircle)
        }
      })
    )
  )
