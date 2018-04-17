import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import VolumeRange from '~/components/VolumeRange.vue'

storiesOf('VolumeRange', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add(
    'default',
    withNotes(`WIP`)(() => {
      return {
        template: `<VolumeRange />`,
        components: { VolumeRange },
        render: (h) => h(VolumeRange)
      }
    })
  )
