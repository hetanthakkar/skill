import { createStore } from "redux";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import themeReducer from "../reducers/theme";
const mainReducer = combineReducers({
  form: formReducer,
  themeReducer,
});

const store = createStore(mainReducer);
export default store;
