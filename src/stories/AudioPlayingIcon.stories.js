import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import AudioPlayingIcon from '~/components/AudioPlayingIcon.vue'

storiesOf('AudioPlayingIcon', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
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
