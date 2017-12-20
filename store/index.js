import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      episodes: [],
      actors: []
    },
    getters: {
      actorByPath: (state) => (path) => {
        return state.actors.find((actor) => actor.path === path)
      }
    },
    mutations: {
      episodes (state, payload) {
        state.episodes = payload
      },
      actors (state, payload) {
        state.actors = payload
      }
    },
    actions: {
      async nuxtServerInit ({ commit }, { req, app }) {
        const episodes = await app.$content('/episode').query({ exclude: [ 'meta', 'anchors', 'date' ] }).getAll()

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
  })
}

export default createStore
