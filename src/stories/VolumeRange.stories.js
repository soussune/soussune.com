import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import { withScreenshot } from 'storybook-chrome-screenshot'
import VolumeRange from '~/components/VolumeRange.vue'

storiesOf('VolumeRange', module)
  .addDecorator(withKnobs)
  .addDecorator(withScreenshot())
  .add(
    'default',
    withNotes(`WIP`)(() => {
      return {
        template: `<VolumeRange />`,
        components: { VolumeRange },
        render: (h) => h(VolumeRange)
      }
    })
  )
