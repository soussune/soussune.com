import Vue from 'vue'
import { DateTime } from 'luxon'

const defaultProfileImageURL = 'https://abs.twimg.com/sticky/default_profile_images/default_profile_200x200.png'
const regularPath = (val) => val.replace(/\/$/, '')

export const state = () => ({
  queries: [],
  searchText: '',
  episodes: [],
  actors: []
})
export const getters = {
  actorToEpisodeMap: (state) => {
    return state.episodes.reduce((map, episode) => {
      episode.actorIds.forEach((actorId) => {
        map[actorId] = [ ...(map[actorId] || []), episode ]
      })
      return map
    }, {})
  },
  actorsWithEpisodes: (state, getters) => {
    return state.actors.map((actor) => ({
      ...actor,
      episodes: getters.actorToEpisodeMap[actor.actorId] || []
    }))
  },
  actorsMap: (state) => {
    return state.actors.reduce((map, actor) => ({ ...map, [actor.actorId]: actor }), {})
  },
  actorByPath: (state, getters) => (path) => {
    const rpath = regularPath(path)
    return getters.actorsWithEpisodes.find((actor) => actor.path === rpath)
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
  episodesForFilter: (state) => {
    return state.episodes.map((episode) => ({
      ...episode,
      bodyText: episode.body.replace(/<[^>]*?>/g, ' ')
    }))
  },
  filteredEpisodes: (state, getters) => {
    if (state.queries.length === 0) return state.episodes
    return getters.episodesForFilter.filter((ep) =>
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
  episodes (state, payload) {
    state.episodes = payload
  },
  actors (state, payload) {
    state.actors = payload
  }
}
export const actions = {
  async nuxtServerInit ({ commit }, { req, app, query }) {
    const episodes = (await app
      .$content('/episode')
      .query({ exclude: [ 'meta', 'anchors', 'date' ] })
      .getAll()).map((episode) => ({
        ...episode,
        published: DateTime.fromSQL(episode.published).valueOf(),
        id: episode.path.replace(/^.*\//, '')
      }))

    const actors = await app.$content('/actors').query({ exclude: [ 'meta', 'anchors', 'date' ] }).getAll()

    commit('episodes', episodes)
    commit('actors', actors)
    commit('searchText', query.q || '')
  }
}
