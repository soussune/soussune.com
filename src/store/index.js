export const state = () => ({
  searchText: ''
})
export const getters = {
  queries: (state) => {
    return state.searchText.split(/\s+/).filter((s) => s !== '')
  }
}
export const mutations = {
  searchText(state, payload) {
    state.searchText = payload
  }
}
