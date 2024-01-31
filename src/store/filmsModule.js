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
  type: "movie",
  "premiere.russia": "01.01.2023-31.12.2023",
  isSeries: false,
  name: "!null",
  description: "!null",
  poster: "!null",
};

export const filmsModule = {
  state: () => ({
    films: [],
    isFilmsLoading: false,
    page: 1,
    limit: 50,
    totalPages: 0,
  }),
  mutations: {
    setFilms(state, films) {
      state.films = films;
    },
    setLoading(state, bool) {
      state.isFilmsLoading = bool;
    },
    setPage(state, page) {
      state.page = page;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
  },
  actions: {
    async fetchFilms({ state, commit }) {
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
    async loadMoreFilms({ state, commit }) {
      try {
        commit("setPage", state.page + 1);
        const response = await ky.get(baseUrl, {
          searchParams: {
            page: state.page,
            limit: state.limit,
          },
          headers: {
            accept: "application/json",
            "X-API-KEY": apiKey,
          },
        });

        commit(
          "setTotalPages",
          Math.ceil(response.headers["x-total-count"] / state.limit)
        );
        commit("setFilms", [...state.films, ...response.data]);
      } catch (e) {
        console.log(e);
      }
    },
  },
  namespaced: true,
};
