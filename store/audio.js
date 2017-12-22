export const state = () => ({
  buffered: 0,
  duration: 0,
  currentTime: 0,
  seekTo: 0,
  volume: 1,
  volume_: 1,
  playbackRate: 1,
  src: '',
  muted: false,
  paused: true
})

export const getters = {
  buffered: (state) => () => state.buffered,
  duration: (state) => () => state.duration,
  currentTime: (state) => () => state.currentTime,
  seekTo: (state) => () => state.seekTo,
  volume: (state) => () => state.volume,
  playbackRate: (state) => () => state.playbackRate,
  muted: (state) => () => state.muted,
  paused: (state) => () => state.paused
}

export const mutations = {
  buffered (state, payload) {
    state.buffered = payload
  },
  duration (state, payload) {
    state.duration = payload
  },
  currentTime (state, payload) {
    state.currentTime = payload
  },
  seekTo (state, payload) {
    state.seekTo = payload
  },
  volume (state, payload) {
    state.volume = state.muted ? 0 : payload
    state.volume_ = payload
  },
  playbackRate (state, payload) {
    state.playbackRate = payload
  },
  src (state, payload) {
    state.src = payload
    state.paused = true
  },
  muted (state, payload) {
    state.muted = payload
    state.volume = state.muted ? 0 : state.volume_
  },
  paused (state, payload) {
    state.paused = payload
  }
}
