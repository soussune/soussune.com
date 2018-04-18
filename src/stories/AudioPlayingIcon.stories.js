import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import { withScreenshot } from 'storybook-chrome-screenshot'
import AudioPlayingIcon from '~/components/AudioPlayingIcon.vue'

storiesOf('AudioPlayingIcon', module)
  .addDecorator(withKnobs)
  .addDecorator(withScreenshot())
  .add(
    'default',
    withNotes(`WIP`)(() => {
      return {
        template: `<AudioPlayingIcon />`,
        components: { AudioPlayingIcon },
        render: (h) => h(AudioPlayingIcon)
      }
    })
  )
