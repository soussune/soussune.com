import { storiesOf } from '@storybook/vue'
import { withKnobs, text, object } from '@storybook/addon-knobs'
import { withNotes } from '@storybook/addon-notes'
import { withScreenshot } from 'storybook-chrome-screenshot'
import { viewports } from './viewports'
import QueryLink from '~/components/QueryLink.vue'

storiesOf('QueryLink', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    withNotes(`WIP`)(
      withScreenshot({
        viewport: Object.values(viewports)
      })(() => {
        const defaultParams = {
          usp: 'sf_link',
          'entry.286431956': 'title'
        }
        const path = text(
          'path',
          'https://docs.google.com/forms/d/e/1FAIpQLSe4p8EuJIocQ_PJl7qe-lZ--pD7AN3LCk4FefDW0DmSBTBHIA/viewform'
        )
        const params = object('params', defaultParams)
        return {
          template: `<QueryLink path="${path}" :params="${params}" />`,
          components: { QueryLink },
          render: (h) => h(QueryLink, { props: { path: path, params } })
        }
      })
    )
  )
