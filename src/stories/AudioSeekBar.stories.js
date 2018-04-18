import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import { withScreenshot } from 'storybook-chrome-screenshot'
import AudioSeekBar from '~/components/AudioSeekBar.vue'

storiesOf('AudioSeekBar', module)
  .addDecorator(withKnobs)
  .addDecorator(withScreenshot())
  .add(
    'default',
    withNotes(`WIP`)(() => {
      return {
        template: `<AudioSeekBar />`,
        components: { AudioSeekBar },
        render: (h) => h(AudioSeekBar)
      }
    })
  )
