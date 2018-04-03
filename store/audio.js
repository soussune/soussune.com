export const state = () => ({
  audioElement: null,
  src: '',
  title: '',
  pagePath: '',
  paused: true,
  canplay: false,
  buffered: 0,
  duration: 0,
  currentTime: 0,
  seekTo: 0,
  volume: 1,
  volume_: 1,
  playbackRate: 1,
  muted: false,
  permalink: ''
})

export const getters = {
  progress: (state) => (state.duration === 0 ? 0 : state.currentTime / state.duration),
  buffered: (state) => () => state.buffered,
  duration: (state) => () => state.duration,
  currentTime: (state) => () => state.currentTime,
  seekTo: (state) => () => state.seekTo,
  volume: (state) => () => state.volume,
  playbackRate: (state) => () => state.playbackRate,
  muted: (state) => () => state.muted,
  paused: (state) => () => state.paused,
  canplay: (state) => () => state.canplay
}

const initAudio = (state) => {
  state.paused = true
  state.canplay = false
  state.buffered = 0
  state.duration = 0
  state.currentTime = 0
  state.seekTo = 0
}
export const mutations = {
  setAudio(state, { src, title, pagePath }) {
    state.src = src
    state.title = title
    state.pagePath = pagePath
    initAudio(state)
  },
  clearAudio(state) {
    state.src = ''
    state.title = ''
    state.pagePath = ''
    initAudio(state)
  },
  audioElement(state, payload) {
    state.audioElement = payload
  },
  buffered(state, payload) {
    state.buffered = payload
  },
  duration(state, payload) {
    state.duration = payload
  },
  currentTime(state, payload) {
    state.currentTime = payload
  },
  seekTo(state, payload) {
    state.seekTo = payload
  },
  volume(state, payload) {
    state.volume = state.muted ? 0 : payload
    state.volume_ = payload
  },
  playbackRate(state, payload) {
    state.playbackRate = payload
  },
  muted(state, payload) {
    state.muted = payload
    state.volume = state.muted ? 0 : state.volume_
  },
  paused(state, payload) {
    state.paused = payload
  },
  permalink(state, payload) {
    state.permalink = payload
  },
  canplay(state, payload) {
    state.canplay = payload
  }
}
