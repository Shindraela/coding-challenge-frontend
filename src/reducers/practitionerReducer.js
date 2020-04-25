import {
  FETCH_PRACTITIONERS_BEGIN,
  FETCH_PRACTITIONERS_SUCCESS,
  FETCH_PRACTITIONERS_FAILURE,
  UPDATE_PRACTITIONER
} from "../actions/types";

const initialState = {
  items: [],
  urlNextPage: null,
  urlPreviousPage: null,
  loading: false,
  isEditing: false,
  error: null
};

export default function practitionerReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRACTITIONERS_BEGIN:
      return { ...state, loading: true, isEditing: false, error: null };
    case FETCH_PRACTITIONERS_SUCCESS:
      return {...state, loading: false, isEditing: false, items: action.payload.practitioners, urlNextPage: action.payload.urlNextPage, urlPreviousPage: action.payload.urlPreviousPage };
    case FETCH_PRACTITIONERS_FAILURE:
      return { ...state, loading: false, isEditing: false, error: action.payload.error, items: [] };
    case UPDATE_PRACTITIONER:
      return Object.assign({}, state, {
        items: state.items.map(item => {
          return item.id === action.payload.id ? action.payload : item;
        }) // replace matched item and returns the array 
      });
    default:
      return state;
  }
}
