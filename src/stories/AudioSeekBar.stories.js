import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import AudioSeekBar from '~/components/AudioSeekBar.vue'

storiesOf('AudioSeekBar', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
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
