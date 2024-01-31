import ky from "ky";

const apiKey = "FMEPD62-QQJ43EA-J04MT7T-96TMA9T";
const baseUrl = "https://api.kinopoisk.dev/v1.3/movie";

export const filterModule = {
  state: () => ({
    rating: null,
    year: null,
    genre: null,
    country: null,
    movies: [],
    type: "movie",
    page: 1,
    limit: 20,
    loading: false,
    loadMore: false,
  }),
  getters: {
    genre: (state) => state.genre,
    country: (state) => state.country,
    rating: (state) => state.rating,
    year: (state) => state.year,
    type: (state) => state.type,
  },
  mutations: {
    setRating(state, rating) {
      state.rating = rating;
    },
    setYear(state, year) {
      state.year = year;
    },
    setGenre(state, genre) {
      state.genre = genre;
    },
    setCountry(state, country) {
      state.country = country;
    },
    setType(state, type) {
      state.type = type;
    },
    setMovies(state, movies) {
      state.movies = movies;
    },
    setPage(state, page) {
      state.page = page;
    },
    setLoading(state, value) {
      state.loading = value;
    },
    setLoadMore(state, value) {
      state.loadMore = value;
    },
  },
  actions: {
    setSearchParams({ commit, dispatch }, searchParams) {
      commit("setRating", searchParams.rating);
      commit("setYear", searchParams.year);
      commit("setGenre", searchParams.genre);
      commit("setCountry", searchParams.country);
    },
    async fetchMoviesData({ state, commit }) {
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
          "type",
        ],
        type: state.type,
        "rating.kp":
          state.rating !== null
            ? `${state.rating[0]}-${state.rating[1]}`
            : null,
        year: state.year !== null ? `${state.year[0]}-${state.year[1]}` : null,
        "genres.name": state.genre,
        "countries.name": state.country,
        isSeries:
          state.type === "movie" || state.type === "cartoon" ? false : true,
        name: "!null",
        description: "!null",
        poster: "!null",
      };
      try {
        const filteredQueryParams = Object.fromEntries(
          Object.entries(queryParams).filter(([key, value]) => value !== null)
        );
        const queryString = Object.entries({
          page: state.page,
          limit: state.limit,
          ...filteredQueryParams,
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
        if (state.loadMore) {
          commit("setMovies", [...state.movies, ...response.docs]);
        } else {
          commit("setMovies", [...response.docs]);
        }
      } catch (e) {
        alert(e);
      } finally {
        commit("setLoading", false);
      }
    },
    async fetchMovies({ dispatch, commit }) {
      commit("setPage", 1);
      commit("setLoadMore", false);
      await dispatch("fetchMoviesData");
    },
    async loadMoreMovies({ dispatch, commit, state }) {
      commit("setPage", state.page + 1);
      commit("setLoadMore", true);
      await dispatch("fetchMoviesData");
    },
  },
  namespaced: true,
};
