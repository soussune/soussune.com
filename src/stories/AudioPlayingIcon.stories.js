import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import { withScreenshot } from 'storybook-chrome-screenshot'
import { viewports } from './viewports'
import AudioPlayingIcon from '~/components/AudioPlayingIcon.vue'

storiesOf('AudioPlayingIcon', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    withNotes(`WIP`)(
      withScreenshot({
        viewport: Object.values(viewports)
      })(() => {
        return {
          template: `<AudioPlayingIcon />`,
          components: { AudioPlayingIcon },
          render: (h) => h(AudioPlayingIcon)
        }
      })
    )
  )
