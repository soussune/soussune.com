import { storiesOf } from '@storybook/vue'
import VueInfoAddon from 'storybook-addon-vue-info'
import { withKnobs } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import FeedbackForm from '~/components/FeedbackForm.vue'

storiesOf('FeedbackForm', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add(
    'default',
    withNotes(`WIP`)(() => {
      return {
        template: `<FeedbackForm />`,
        components: { FeedbackForm },
        render: (h) => h(FeedbackForm)
      }
    })
  )
