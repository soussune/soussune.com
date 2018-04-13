import { storiesOf } from '@storybook/vue'
import ActorIcon from '~/components/ActorIcon.vue'

const actor = {
  imageUrl:
    '//images.ctfassets.net/gvze4h7pavn2/55XW80AaGc42cm8SsseAmC/d44f2d51e13bb90347008942d59e8f4c/actor-trkw.jpg',
  title: 'trkw'
}
const noValidSrcActor = {
  imageUrl: '',
  title: 'title'
}

storiesOf('ActorIcon', module)
  .add('default size(200px)', () => ({
    render: (h) => h(ActorIcon, { props: { actor } })
  }))
  .add('80x80', () => ({
    components: { ActorIcon },
    render: (h) => h(ActorIcon, { props: { actor, size: 80 } })
  }))
  .add('no valid src', () => ({
    components: { ActorIcon },
    render: (h) => h(ActorIcon, { props: { actor: noValidSrcActor } })
  }))
