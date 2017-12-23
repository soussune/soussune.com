import { DateTime } from 'luxon'

export const state = () => ({
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
    return state.episodes.find((episode) => episode.path === path)
  }
}
export const mutations = {
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
      .getAll()).map((e) => ({ ...e, published: DateTime.fromSQL(e.published).valueOf() }))

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
