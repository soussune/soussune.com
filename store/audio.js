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
  paused: true,
  title: '',
  permalink: '',
  playing: false
})

export const getters = {
  buffered: (state) => () => state.buffered,
  duration: (state) => () => state.duration,
  currentTime: (state) => () => state.currentTime,
  seekTo: (state) => () => state.seekTo,
  volume: (state) => () => state.volume,
  playbackRate: (state) => () => state.playbackRate,
  muted: (state) => () => state.muted,
  paused: (state) => () => state.paused,
  playing: (state) => () => state.playing,
  src: (state) => () => state.src,
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
  },
  muted (state, payload) {
    state.muted = payload
    state.volume = state.muted ? 0 : state.volume_
  },
  paused (state, payload) {
    state.paused = payload
  },
  title (state, payload) {
    state.title = payload
  },
  permalink (state, payload) {
    state.permalink = payload
  },
  playing (state, payload) {
    state.playing = payload
  }
}
