import ky from "ky";

// const apiKey = "FMEPD62-QQJ43EA-J04MT7T-96TMA9T";
const apiKey = "HK86KQ7-6C74D4C-NFHHVPX-HBJXVE6";
const baseUrl = "https://api.kinopoisk.dev/v1.3/movie";
const queryParams = {
  selectFields: [
    "id",
    "name",
    "rating.kp",
    "genres.name",
    "countries.name",
    "year",
    "description",
    "movieLength",
    "poster.url",
  ],
  type: "movie",
  isSeries: false,
  lists: "most-expensive",
  name: "!null",
  description: "!null",
  poster: "!null",
  sortField: "rating.kp",
  sortType: "-1",
};

export const expensiveFilmsModule = {
  state: () => ({
    expensiveFilms: [],
    isFilmsLoading: false,
    page: 1,
    limit: 100,
  }),
  mutations: {
    setFilms(state, expensiveFilms) {
      state.expensiveFilms = expensiveFilms;
    },
    setLoading(state, bool) {
      state.isFilmsLoading = bool;
    },
  },
  actions: {
    async fetchExpensiveFilms({ state, commit }) {
      try {
        const queryString = Object.entries({
          page: state.page,
          limit: state.limit,
          ...queryParams,
        })
          .map(([key, value]) => {
            if (Array.isArray(value)) {
              return value.map((v) => `${key}=${v}`).join("&");
            } else {
              return `${key}=${value}`;
            }
          })
          .join("&");

        const url = `${baseUrl}?${queryString}`;

        const response = await ky
          .get(url, {
            headers: {
              accept: "application/json",
              "X-API-KEY": apiKey,
            },
          })
          .json();
        commit("setFilms", response.docs);
      } catch (e) {
        alert(e);
      } finally {
        commit("setLoading", false);
      }
    },
  },
  getters: {
    getExpensiveFilms(state) {
      return state.expensiveFilms;
    },
  },
  namespaced: true,
};
