import * as api from '../../api/game-api';
import actions from './gameActions';

const requestGameSettings = () => async (dispatch) => {
  dispatch(actions.fetchRequest());

  try {
    const response = await api.getGameSettings();
    dispatch(actions.setAvailableSettings(response));
    dispatch(actions.fetchSuccess());
  } catch (error) {
    dispatch(actions.fetchError(error.message));
  }
};

const requestWinners = () => async (dispatch) => {
  dispatch(actions.fetchRequest());

  try {
    const response = await api.getWinners();
    dispatch(actions.updateWinners(response));
    dispatch(actions.fetchSuccess());
  } catch (error) {
    dispatch(actions.fetchError(error.message));
  }
};

const updateWinners = (winner) => async (dispatch) => {
  dispatch(actions.fetchRequest());

  try {
    const response = await api.setWinners(winner);
    dispatch(actions.updateWinners(response));
    dispatch(actions.fetchSuccess());
  } catch (error) {
    dispatch(actions.fetchError(error.message));
  }
};

export default {
  requestGameSettings,
  requestWinners,
  updateWinners,
};
