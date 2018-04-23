import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import { withScreenshot } from 'storybook-chrome-screenshot'
import { viewports } from './viewports'
import AudioControlButton from '~/components/AudioControlButton.vue'

storiesOf('AudioControlButton', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    withNotes(`WIP`)(
      withScreenshot({
        viewport: Object.values(viewports)
      })(() => {
        return {
          template: `<AudioControlButton />`,
          components: { AudioControlButton },
          render: (h) => h(AudioControlButton)
        }
      })
    )
  )
