const FAVORITES_KEY = "favorites";

export const favoritesModule = {
  state: () => ({
    favorites: [],
    sortOfRating: null,
    sortOfType: null,
  }),
  mutations: {
    setFavorites(state, favorites) {
      state.favorites = favorites;
    },
    addToFavorites(state, movie) {
      const isFavorite = state.favorites.some(
        (favMovie) => favMovie.id === movie.id
      );
      if (!isFavorite) {
        state.favorites.push(movie);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(state.favorites));
      }
    },
    removeFromFavorites(state, movieId) {
      state.favorites = state.favorites.filter((movie) => movie.id !== movieId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(state.favorites));
    },
    sortRating(state, sortOfRating) {
      state.sortOfRating = sortOfRating;
    },
    sortType(state, sortOfType) {
      state.sortOfType = sortOfType;
    },
  },
  actions: {
    loadFavorites({ commit }) {
      const items = localStorage.getItem(FAVORITES_KEY);
      if (items) {
        commit("setFavorites", JSON.parse(items));
      }
    },
  },
  getters: {
    getFavorites(state) {
      return state.favorites;
    },
    sortedOfRating(state) {
      return [...state.favorites].sort((favorite1, favorite2) => {
        switch (state.sortOfRating) {
          case "less":
            return favorite1.rating.kp < favorite2.rating.kp ? -1 : 1;

          case "big":
            return favorite1.rating.kp > favorite2.rating.kp ? -1 : 1;

          default:
            return 0;
        }
      });
    },
    sortedOfRatingAndType(state, getters) {
      switch (state.sortOfType) {
        case null:
          return getters.sortedOfRating;
        default:
          return getters.sortedOfRating.filter(
            (favorite) => favorite.type === state.sortOfType
          );
      }
    },
  },
  namespaced: true,
};
