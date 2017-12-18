import { DateTime } from 'luxon'

export default {
  asyncData: async (context) => {
    const { app } = context

    const appearMap = (await app
      .$content('/episode')
      .query({ exclude: [ 'meta', 'body', 'anchors', 'date' ] })
      .getAll())
      .map((epsode) => ({ ...epsode, date: DateTime.fromSQL(epsode.published).toJSDate() }))
      .reduce((map, epsode) => {
        epsode.actorIds.forEach((actorId) => {
          map[actorId] = [ ...(map[actorId] || []), epsode ]
        })
        return map
      }, {})

    const actors = (await app.$content('/actors').query({ exclude: [ 'meta', 'body', 'anchors', 'date' ] }).getAll())
      .map((actor) => ({ ...actor, appears: appearMap[actor.actorId] || [] }))
      .sort((a, b) => {
        // sort by appearCount or lastAppearDate
        const countDiff = b.appears.length - a.appears.length
        return countDiff !== 0 ? countDiff : b.appears[0].date - a.appears[0].date
      })

    return { actors }
  }
}
