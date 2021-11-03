const DEFAULT_STATE = {
  theme: "light",
};
const themeReducer = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case "CHANGE_THEME":
      if (payload.theme == "dark") return { theme: "dark" };
      if (payload.theme == "light") return { theme: "light" };
    default:
      return state;
  }
};
export default themeReducer;
