import ky from "ky";

const apiKey = "FMEPD62-QQJ43EA-J04MT7T-96TMA9T";
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
    "premiere.russia",
  ],
  type: "tv-series",
  "premiere.russia": "01.01.2023-31.12.2023",
  isSeries: true,
  name: "!null",
  description: "!null",
  poster: "!null",
};

export const seriesModule = {
  state: () => ({
    series: [],
    isSeriesLoading: false,
    page: 1,
    limit: 50,
  }),
  mutations: {
    setSeries(state, series) {
      state.series = series;
    },
    setLoading(state, bool) {
      state.isFilmsLoading = bool;
    },
    setPage(state, page) {
      state.page = page;
    },
  },
  actions: {
    async fetchSeries({ state, commit }) {
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

        commit("setSeries", response.docs);
      } catch (e) {
        alert(e);
      } finally {
        commit("setLoading", false);
      }
    },
  },
  namespaced: true,
};
