export const getTitle = (filmType) => {
  switch (filmType) {
    case "films":
      return "Фильмы";
    case "series":
      return "Сериалы";
    case "cartoons":
      return "Мультфильмы";
    case "anime":
      return "Аниме";
    case "animatedSeries":
      return "Анимационные сериалы";
    default:
      return "Новинки";
  }
};
