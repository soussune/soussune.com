import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import { withScreenshot } from 'storybook-chrome-screenshot'
import AudioPlayButton from '~/components/AudioPlayButton.vue'

storiesOf('AudioPlayButton', module)
  .addDecorator(withKnobs)
  .addDecorator(withScreenshot())
  .add(
    'default',
    withNotes(`WIP`)(() => {
      return {
        template: `<AudioPlayButton />`,
        components: { AudioPlayButton },
        render: (h) => h(AudioPlayButton)
      }
    })
  )
