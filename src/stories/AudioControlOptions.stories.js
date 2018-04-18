import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import { withScreenshot } from 'storybook-chrome-screenshot'
import AudioControlOptions from '~/components/AudioControlOptions.vue'

storiesOf('AudioControlOptions', module)
  .addDecorator(withKnobs)
  .addDecorator(withScreenshot())
  .add(
    'default',
    withNotes(`WIP`)(() => {
      return {
        template: `<AudioControlOptions />`,
        components: { AudioControlOptions },
        render: (h) => h(AudioControlOptions)
      }
    })
  )
