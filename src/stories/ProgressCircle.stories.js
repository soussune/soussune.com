import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import ProgressCircle from '~/components/ProgressCircle.vue'

storiesOf('ProgressCircle', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add(
    'default',
    withNotes(`WIP`)(() => {
      return {
        template: `<ProgressCircle />`,
        components: { ProgressCircle },
        render: (h) => h(ProgressCircle)
      }
    })
  )
