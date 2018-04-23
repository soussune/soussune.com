import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import { withScreenshot } from 'storybook-chrome-screenshot'
import { viewports } from './viewports'
import AudioControlOptions from '~/components/AudioControlOptions.vue'

storiesOf('AudioControlOptions', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    withNotes(`WIP`)(
      withScreenshot({
        viewport: Object.values(viewports)
      })(() => {
        return {
          template: `<AudioControlOptions />`,
          components: { AudioControlOptions },
          render: (h) => h(AudioControlOptions)
        }
      })
    )
  )
