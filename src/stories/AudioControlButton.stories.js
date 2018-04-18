import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import { withScreenshot } from 'storybook-chrome-screenshot'
import AudioControlButton from '~/components/AudioControlButton.vue'

storiesOf('AudioControlButton', module)
  .addDecorator(withKnobs)
  .addDecorator(withScreenshot())
  .add(
    'default',
    withNotes(`WIP`)(() => {
      return {
        template: `<AudioControlButton />`,
        components: { AudioControlButton },
        render: (h) => h(AudioControlButton)
      }
    })
  )
