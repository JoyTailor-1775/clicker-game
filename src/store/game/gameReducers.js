import { combineReducers } from 'redux';
import types from './gameActionsTypes';
import GAME_STATUSES from '../../configs/gameStatuses';

const INITIAL_GAME_CONFIG = Object.freeze({
  mode: {
    field: 5,
    delay: 2000,
  },
  playerName: '',
});

function gameConfigReducer(state = { ...INITIAL_GAME_CONFIG }, { type, payload }) {
  switch (type) {
    case types.SET_GAME_CONFIG:
      return { ...state, ...payload };

    default:
      return state;
  }
}

function gameStatusReducer(state = GAME_STATUSES.INITIAL, { type, payload }) {
  switch (type) {
    case types.SET_GAME_STATUS:
      return payload;

    default:
      return state;
  }
}

function winnersReducer(state = [], { type, payload }) {
  switch (type) {
    case types.GET_WINNERS:
      return state;

    case types.UPDATE_WINNERS:
      return [...state, payload];

    default:
      return state;
  }
}

function lastWinnerReducer(state = null, { type, payload }) {
  switch (type) {
    case types.SET_LAST_WINNER:
      return payload;

    default:
      return state;
  }
}

function availableSettingsReducer(state = null, { type, payload }) {
  switch (type) {
    case types.GET_AVAILABLE_SETTINGS:
      return payload;

    default:
      return state;
  }
}

function loadingReducer(state = false, { type }) {
  switch (type) {
    case types.FETCH_REQUEST:
      return true;

    case types.FETCH_SUCCESS:
    case types.FETCH_ERROR:
      return false;

    default:
      return state;
  }
}

function errorReducer(state = null, { type, payload }) {
  switch (type) {
    case types.FETCH_REQUEST:
      return null;

    case types.FETCH_ERROR:
      return payload;

    default:
      return state;
  }
}

export default combineReducers({
  gameConfig: gameConfigReducer,
  gameStatus: gameStatusReducer,
  availableSettings: availableSettingsReducer,
  winners: winnersReducer,
  lastWinner: lastWinnerReducer,
  loading: loadingReducer,
  error: errorReducer,
});
