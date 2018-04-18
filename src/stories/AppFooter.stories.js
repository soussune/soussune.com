import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import { withScreenshot } from 'storybook-chrome-screenshot'
import AppFooter from '~/components/AppFooter.vue'

storiesOf('AppFooter', module)
  .addDecorator(withKnobs)
  .addDecorator(withScreenshot())
  .add(
    'default',
    withNotes(`WIP`)(() => {
      return {
        template: `<AppFooter class="app_footer" />`,
        components: { AppFooter },
        render: (h) => h(AppFooter)
      }
    })
  )
