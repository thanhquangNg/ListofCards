import { combineReducers } from 'redux';

const api = 'https://tnhang-didomi.herokuapp.com/api/cards';
// const apiSaved = 'https://tnhang-didomi.herokuapp.com/api/savedCards';

export const getList = (field = 'data', params = '') => async dispatch => {
  dispatch({ type: 'GET_LIST', field });
  try {
    let response = await fetch(`${api}${params ? `?${params}`: ''}`);
    response = await response.json();
    const { data, error, status } = response;
    if (status === 200 && Array.isArray(data.list)) {
      return dispatch({ type: 'GET_LIST_DONE', data: data.list, field });
    } else {
      dispatch({ type: 'GET_LIST_ERROR' }); 
    }
  } catch (e) {
    dispatch({ type: 'GET_LIST_ERROR' });
  }
}

export const updateItem = body => async dispatch => {
  dispatch({ type: 'UPDATE_ITEM' });
  // return
  try {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    let response = await fetch(api, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    response = await response.json();
    const { data, error, status } = response;
    if (status === 200 ) {
      return dispatch({ type: 'UPDATE_ITEM_DONE', data: data.list });
    } else {
      dispatch({ type: 'UPDATE_ITEM_ERROR' }); 
    }
  } catch (e) {
    dispatch({ type: 'UPDATE_ITEM_ERROR' });
  }
}

export const addSavedItem = id => async dispatch => {
  dispatch({ type: 'SAVED_ITEM_ADD', id })
}

export const removeSavedItem = id => async dispatch => {
  dispatch({ type: 'SAVED_ITEM_REMOVE', id })
}

const listReducer = (state = {
  data: [],
  behavior: 'stall',
  savedId: [],
  savedItem: []
}, action) => {
  let savedId;
  //read action
  //console.log(action);
  switch(action.type) {
    case 'GET_LIST':
      return { ...state, behavior: 'fetching', [action.field]: [] };
    case 'GET_LIST_ERROR':
      return { ...state, behavior: 'stall' };
    case 'GET_LIST_DONE':
      return { ...state, behavior: 'stall', [action.field]: action.data };
    case 'UPDATE_ITEM_DONE':
      return { ...state, behavior: 'updateDone'}
    case 'SAVED_ITEM_ADD':
      savedId = state.savedId.includes(action.id) ? state.savedId : [...state.savedId, action.id];
      localStorage.savedId = savedId;
      return { ...state, savedId };
    case 'SAVED_ITEM_REMOVE':
      savedId = state.savedId.filter(itemId => itemId !== action.id);
      localStorage.savedId = savedId;
      return { ...state, behavior:'removeSaveItem',savedId };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  listReducer
});

export default rootReducer;