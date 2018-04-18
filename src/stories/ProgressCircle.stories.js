import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import { withScreenshot } from 'storybook-chrome-screenshot'
import ProgressCircle from '~/components/ProgressCircle.vue'

storiesOf('ProgressCircle', module)
  .addDecorator(withKnobs)
  .addDecorator(withScreenshot())
  .add(
    'default',
    withNotes(`WIP`)(() => {
      return {
        template: `<ProgressCircle />`,
        components: { ProgressCircle },
        render: (h) => h(ProgressCircle)
      }
    })
  )
