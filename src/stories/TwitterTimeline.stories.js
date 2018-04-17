import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import TwitterTimeline from '~/components/TwitterTimeline.vue'

storiesOf('TwitterTimeline', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add(
    'default',
    withNotes(`WIP`)(() => {
      return {
        template: `<TwitterTimeline />`,
        components: { TwitterTimeline },
        render: (h) => h(TwitterTimeline)
      }
    })
  )
