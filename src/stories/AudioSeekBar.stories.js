import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import { withScreenshot } from 'storybook-chrome-screenshot'
import { viewports } from './viewports'
import AudioSeekBar from '~/components/AudioSeekBar.vue'

storiesOf('AudioSeekBar', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    withNotes(`WIP`)(
      withScreenshot({
        viewport: Object.values(viewports)
      })(() => {
        return {
          template: `<AudioSeekBar />`,
          components: { AudioSeekBar },
          render: (h) => h(AudioSeekBar)
        }
      })
    )
  )
