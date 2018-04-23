import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import { withScreenshot } from 'storybook-chrome-screenshot'
import { viewports } from './viewports'
import Jumbotron from '~/components/Jumbotron.vue'

storiesOf('Jumbotron', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    withNotes({ text: 'WIP' })(
      withScreenshot({
        viewport: Object.values(viewports)
      })(() => {
        return {
          template: `<Jumbotron />`,
          components: { Jumbotron },
          render: (h) => h(Jumbotron)
        }
      })
    )
  )
