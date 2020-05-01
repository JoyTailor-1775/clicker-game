import axios from 'axios';

axios.defaults.baseURL = 'https://starnavi-frontend-test-task.herokuapp.com/';

export const getGameSettings = async () => {
  const res = await axios.get('/game-settings');
  return res.data;
};

export const getWinners = async () => {
  const res = await axios.get('/winners');
  return res.data;
};

export const setWinner = async (data) => {
  const res = await axios.post('/winners', data);
  return res.data;
};
