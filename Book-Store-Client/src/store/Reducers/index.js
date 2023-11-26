import { combineReducers } from "redux";
import UserReducer from "./UserReducer.js";

const reducers = combineReducers({
  User: UserReducer,
});

export default reducers;
