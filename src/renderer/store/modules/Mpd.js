const state = {
  song: null,
  status: {
    'volume': '-1',
    'repeat': '0',
    'random': '0',
    'single': '0',
    'consume': '0',
    'playlist': '0',
    'playlistlength': '0',
    'mixrampdb': '0.00000',
    'state': 'stop'
  },
  art: null,
  lastupdate: new Date().getTime() / 1000
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
  },
  setstatus (state, status) {
    state.status = status
    state.lastupdate = new Date().getTime() / 1000
  },
  setvol (state, vol) {
    state.status.vol = vol
  }
}

export default {
  state,
  mutations
}
