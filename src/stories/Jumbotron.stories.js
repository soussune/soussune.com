import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import { withScreenshot } from 'storybook-chrome-screenshot'
import Jumbotron from '~/components/Jumbotron.vue'

storiesOf('Jumbotron', module)
  .addDecorator(withKnobs)
  .addDecorator(withScreenshot())
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
