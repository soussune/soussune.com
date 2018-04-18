import { storiesOf } from '@storybook/vue'
import { withKnobs, object, number } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import { withScreenshot } from 'storybook-chrome-screenshot'
import ActorIcon from '~/components/ActorIcon.vue'

storiesOf('ActorIcon', module)
  .addDecorator(withKnobs)
  .addDecorator(withScreenshot())
  .add(
    'default',
    withNotes(`WIP`)(() => {
      const defaultActor = {
        imageUrl:
          '//images.ctfassets.net/gvze4h7pavn2/55XW80AaGc42cm8SsseAmC/d44f2d51e13bb90347008942d59e8f4c/actor-trkw.jpg',
        title: 'trkw'
      }
      const actor = object('actor', defaultActor)
      const size = number('size', 200)
      return {
        template: `<ActorIcon :actor="${actor}" :size="${size}" />`,
        components: { ActorIcon },
        render: (h) => h(ActorIcon, { props: { actor, size: size } })
      }
    })
  )
