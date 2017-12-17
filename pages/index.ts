import { DateTime } from 'luxon'

export default {
  asyncData: async ({ app }) => ({
    posts: await app.$content('/episode').query({ exclude: 'body' }).getAll()
  }),
  filters: {
    date (val: string) {
      return DateTime.fromSQL(val).toFormat('yyyy年MM月dd日')
    },
    join (array: string[], val: string) {
      return array.join(val)
    }
  }
}
