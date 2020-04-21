import { combineReducers } from "redux";
import practitionerReducer from "./practitionerReducer";

export default combineReducers({
  practitioners: practitionerReducer
});
