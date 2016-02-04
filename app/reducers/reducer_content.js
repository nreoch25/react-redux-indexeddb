import { FETCH_CONTENT, FETCH_STORY } from "../actions/index";
const INITIAL_STATE = { all: [], story: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_CONTENT:
      return { ...state, all: action.payload.data }
    case FETCH_STORY:
      return { ...state, story: action.payload.data }
    default:
      return state;
  }
}