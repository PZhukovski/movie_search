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
  type: "anime",
  isSeries: false,
  name: "!null",
  description: "!null",
  poster: "!null",
};

export const animeModule = {
  state: () => ({
    anime: [],
    isAnimeLoading: false,
    page: 1,
    limit: 50,
    totalPages: 0,
  }),
  mutations: {
    setAnime(state, anime) {
      state.anime = anime;
    },
    setLoading(state, bool) {
      state.isAnimeLoading = bool;
    },
    setPage(state, page) {
      state.page = page;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
  },
  actions: {
    async fetchAnime({ state, commit }) {
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

        commit("setAnime", response.docs);
      } catch (e) {
        alert(e);
      } finally {
        commit("setLoading", false);
      }
    },
    async loadMoreAnime({ state, commit }) {
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
        commit("setAnime", [...state.anime, ...response.data]);
      } catch (e) {
        console.log(e);
      }
    },
  },
  namespaced: true,
};
