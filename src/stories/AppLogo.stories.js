import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import figmaDecorator from 'storybook-addon-figma'
import AppLogo from '~/components/AppLogo.vue'

storiesOf('AppLogo', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
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
