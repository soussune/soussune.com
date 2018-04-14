import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import FeedbackTweet from '~/components/FeedbackTweet.vue'

storiesOf('FeedbackTweet', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add(
    'default',
    withNotes(`WIP`)(() => {
      return {
        template: `<FeedbackTweet />`,
        components: { FeedbackTweet },
        render: (h) => h(FeedbackTweet)
      }
    })
  )
