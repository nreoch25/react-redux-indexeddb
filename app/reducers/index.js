import { combineReducers } from "redux";
import CategoriesReducer from "./reducer_categories";
import ContentReducer from "./reducer_content";

const rootReducer = combineReducers({
  categories: CategoriesReducer,
  content: ContentReducer
});

export default rootReducer;