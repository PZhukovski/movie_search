import ky from "ky";
// const apiKey = "HK86KQ7-6C74D4C-NFHHVPX-HBJXVE6";
const apiKey = "FMEPD62-QQJ43EA-J04MT7T-96TMA9T";
const baseUrl = "https://api.kinopoisk.dev/v1.4/movie";

export const idMovieModule = {
  state: () => ({
    idMovie: null,
    seasons: null,
  }),
  mutations: {
    setIdMovie(state, idMovie) {
      state.idMovie = idMovie;
    },
    setSeasons(state, seasons) {
      state.seasons = seasons;
    },
  },
  actions: {
    async fetchIdMovie({ state, commit }, id) {
      try {
        const url = `${baseUrl}/${id}`;
        const response = await ky
          .get(url, {
            headers: {
              accept: "application/json",
              "X-API-KEY": apiKey,
            },
          })
          .json();
        commit("setIdMovie", response);

        const urlSeasons = `https://api.kinopoisk.dev/v1.4/season?page=1&limit=20&movieId=${id}`;
        const responseSeason = await ky
          .get(urlSeasons, {
            headers: {
              accept: "application/json",
              "X-API-KEY": apiKey,
            },
          })
          .json();
        commit("setSeasons", responseSeason.docs);
      } catch (e) {
        alert(e);
      }
    },
  },
  namespaced: true,
};
