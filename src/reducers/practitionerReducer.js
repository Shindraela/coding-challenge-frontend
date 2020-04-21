import { FETCH_PRACTITIONERS_BEGIN, FETCH_PRACTITIONERS_SUCCESS, FETCH_PRACTITIONERS_FAILURE } from "../actions/types";

const initialState = {
  items: [],
  loading: false,
  error: null
};

export default function practitionerReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRACTITIONERS_BEGIN:
      return { ...state, loading: true, error: null };
    case FETCH_PRACTITIONERS_SUCCESS:
      return {...state, loading: false, items: action.payload };
    case FETCH_PRACTITIONERS_FAILURE:
      return { ...state, loading: false, error: action.payload.error, items: [] };
    default:
      return state;
  }
}
