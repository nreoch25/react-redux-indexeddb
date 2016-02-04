import { FETCH_CATEGORIES } from "../actions/index";
const INITIAL_STATE = { categories: [] };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_CATEGORIES:
      return { ...state, categories: action.payload.data }
    default:
      return state;
  }
}