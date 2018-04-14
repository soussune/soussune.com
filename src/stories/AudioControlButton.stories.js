import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import AudioControlButton from '~/components/AudioControlButton.vue'

storiesOf('AudioControlButton', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
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
