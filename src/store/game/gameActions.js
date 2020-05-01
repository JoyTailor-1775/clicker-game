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

const getGameConfig = () => ({
  type: types.GET_GAME_CONFIG,
});

const setGameConfig = (params) => ({
  type: types.SET_GAME_CONFIG,
  payload: params,
});

const getGameStatus = () => ({
  type: types.GET_GAME_STATUS,
});

const setGameStatus = (status) => ({
  type: types.SET_GAME_STATUS,
  payload: status,
});

const getWinners = () => ({
  type: types.GET_WINNERS,
});

const updateWinners = (winner) => ({
  type: types.UPDATE_WINNERS,
  payload: winner,
});

const getGameSettings = () => ({
  type: types.GET_GAME_SETTINGS,
});

export default {
  fetchRequest,
  fetchError,
  fetchSuccess,
  getGameConfig,
  setGameConfig,
  getGameStatus,
  setGameStatus,
  getWinners,
  updateWinners,
  getGameSettings,
};
