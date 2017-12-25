import { DateTime } from 'luxon'

export const state = () => ({
  queries: [],
  searchText: '',
  episodes: [],
  actors: []
})
export const getters = {
  actorById: (state) => (actorId) => {
    return state.actors.find((actor) => actor.actorId === actorId)
  },
  actorByPath: (state) => (path) => {
    return state.actors.find((actor) => actor.path === path)
  },
  episodeByPath: (state) => (path) => {
    const i = state.episodes.map((ep) => ep.path).indexOf(path)
    return { ...state.episodes[i], newer: state.episodes[i - 1], older: state.episodes[i + 1] }
  },
  filteredEpisodes: (state) => {
    return state.queries.length === 0
      ? state.episodes
      : state.episodes.filter((ep) =>
          state.queries.every((q) => {
            const r = new RegExp(q, 'i')
            return (
              ep.actorIds.some((a) => a.match(r)) ||
              ep.topics.some((t) => t.match(r) || ep.title.match(r) || ep.bodyText.match(r))
            )
          })
        )
  }
}
export const mutations = {
  searchText (state, payload) {
    state.queries = payload.split(/\s+/).filter((s) => s !== '')
    state.searchText = payload
  },
  episodes (state, payload) {
    state.episodes = payload
  },
  actors (state, payload) {
    state.actors = payload
  }
}
export const actions = {
  async nuxtServerInit ({ commit }, { req, app }) {
    const episodes = (await app
      .$content('/episode')
      .query({ exclude: [ 'meta', 'anchors', 'date' ] })
      .getAll()).map((e) => ({
        ...e,
        published: DateTime.fromSQL(e.published).valueOf(),
        id: e.path.replace(/^.*\//, ''),
        bodyText: e.body.replace(/<[^>]*?>/g, ' ')
      }))

    const appearMap = episodes.reduce((map, epsode) => {
      epsode.actorIds.forEach((actorId) => {
        map[actorId] = [ ...(map[actorId] || []), epsode ]
      })
      return map
    }, {})

    const actors = (await app
      .$content('/actors')
      .query({ exclude: [ 'meta', 'anchors', 'date' ] })
      .getAll()).map((actor) => ({ ...actor, episodes: appearMap[actor.actorId] || [] }))

    commit('episodes', episodes)
    commit('actors', actors)
  }
}
