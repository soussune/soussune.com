import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import Jumbotron from '~/components/Jumbotron.vue'

storiesOf('Jumbotron', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add(
    'default',
    withNotes(`WIP`)(() => {
      return {
        template: `<Jumbotron />`,
        components: { Jumbotron },
        render: (h) => h(Jumbotron)
      }
    })
  )
