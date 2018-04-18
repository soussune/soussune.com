import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import { withScreenshot } from 'storybook-chrome-screenshot'
import figmaDecorator from 'storybook-addon-figma'
import AppLogo from '~/components/AppLogo.vue'

storiesOf('AppLogo', module)
  .addDecorator(withKnobs)
  .addDecorator(withScreenshot())
  .addDecorator(
    figmaDecorator({
      url: 'https://www.figma.com/file/SsCo9NuNNVITY1KMq5JfJfpx/AppLogo'
    })
  )
  .add(
    'default',
    withNotes(`WIP`)(() => {
      return {
        template: `<AppLogo />`,
        components: { AppLogo },
        render: (h) => h(AppLogo)
      }
    })
  )
