export const makeId = () =>
  new Date().getTime().toString() + Math.floor(Math.random() * 10).toString();
