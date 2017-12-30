import Vue from 'vue'
import { DateTime } from 'luxon'

const defaultProfileImageURL = 'https://abs.twimg.com/sticky/default_profile_images/default_profile_200x200.png'
const regularPath = (val) => val.replace(/\/$/, '')

export const state = () => ({
  queries: [],
  searchText: '',
  searchFocus: false,
  episodes: [],
  actors: []
})
export const getters = {
  actorsMap: (state) => {
    return state.actors.reduce((map, actor) => ({ ...map, [actor.actorId]: actor }), {})
  },
  actorById: (state, getters) => (actorId) => {
    return getters.actorsMap[actorId]
  },
  actorByPath: (state) => (path) => {
    const rpath = regularPath(path)
    return state.actors.find((actor) => actor.path === rpath)
  },
  episodesWithActors: (state, getters) => {
    return state.episodes.map((episode) => ({
      ...episode,
      actors: episode.actorIds.map((actorId) => getters.actorsMap[actorId])
    }))
  },
  episodeByPath: (state, getters) => (path) => {
    const rpath = regularPath(path)
    const episodes = getters.episodesWithActors
    const i = episodes.map((episode) => episode.path).indexOf(rpath)
    const episode = episodes[i]
    return {
      ...episode,
      newer: state.episodes[i - 1],
      older: state.episodes[i + 1]
    }
  },
  filteredEpisodes: (state) => {
    if (state.queries.length === 0) return state.episodes
    return state.episodes.filter((ep) =>
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
  setDefaultActorIcon (state, payload) {
    const i = state.actors.findIndex((actor) => actor.actorId === payload)
    if (i < 0) return
    Vue.set(state.actors, i, {
      ...state.actors[i],
      imageUrl: defaultProfileImageURL
    })
  },
  searchText (state, payload) {
    state.queries = payload.split(/\s+/).filter((s) => s !== '')
    state.searchText = payload
  },
  searchFocus (state, payload) {
    state.searchFocus = payload
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
