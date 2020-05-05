import types from './gameActionsTypes';

const fetchRequest = () => ({
  type: types.FETCH_REQUEST,
});

const fetchError = (error) => ({
  type: types.FETCH_ERROR,
  payload: error,
});

const fetchSuccess = () => ({
  type: types.FETCH_SUCCESS,
});

const setGameConfig = (params) => ({
  type: types.SET_GAME_CONFIG,
  payload: params,
});

const setGameStatus = (status) => ({
  type: types.SET_GAME_STATUS,
  payload: status,
});

const updateWinners = (winner) => ({
  type: types.UPDATE_WINNERS,
  payload: winner,
});

const setLastWinner = (winner) => ({
  type: types.SET_LAST_WINNER,
  payload: winner,
});

const getAvailableSettings = (settings) => ({
  type: types.GET_AVAILABLE_SETTINGS,
  payload: settings,
});

export default {
  fetchRequest,
  fetchError,
  fetchSuccess,
  setGameConfig,
  setGameStatus,
  updateWinners,
  setLastWinner,
  getAvailableSettings,
};
