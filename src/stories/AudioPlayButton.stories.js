import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import AudioPlayButton from '~/components/AudioPlayButton.vue'

storiesOf('AudioPlayButton', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
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
