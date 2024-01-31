export const getRatingStyle = (rating) => {
  if (rating >= 7) {
    return { backgroundColor: "rgb(101, 251, 55)" };
  } else if (rating >= 5) {
    return { backgroundColor: "yellow" };
  } else {
    return { backgroundColor: "red" };
  }
};
