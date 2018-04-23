import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import { withScreenshot } from 'storybook-chrome-screenshot'
import { viewports } from './viewports'
import VolumeRange from '~/components/VolumeRange.vue'

storiesOf('VolumeRange', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    withNotes(`WIP`)(
      withScreenshot({
        viewport: Object.values(viewports)
      })(() => {
        return {
          template: `<VolumeRange />`,
          components: { VolumeRange },
          render: (h) => h(VolumeRange)
        }
      })
    )
  )
