import { combineReducers } from "redux";
import { themeReducer } from "./theme";

export const reducers = combineReducers({
    theme: themeReducer,
});
