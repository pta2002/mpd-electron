const state = {
  song: null,
  art: null
}

const mutations = {
  setsong (state, song) {
    if (song != null && state.song != null && song['Album'] !== state.song['Album'] && song['Artist'] !== state.song['Artist']) {
      state.art = null
    }
    state.song = song
  },
  setart (state, art) {
    state.art = art
  }
}

export default {
  state,
  mutations
}
