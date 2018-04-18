import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import { withScreenshot } from 'storybook-chrome-screenshot'
import AppBody from '~/components/AppBody.vue'

storiesOf('AppBody', module)
  .addDecorator(withKnobs)
  .addDecorator(withScreenshot())
  .add(
    'default',
    withNotes(`WIP`)(() => {
      return {
        template: `<AppBody class="app_body" />`,
        components: { AppBody },
        render: (h) => h(AppBody)
      }
    })
  )
