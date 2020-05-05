import { combineReducers } from 'redux';
import gameReducers from './game/gameReducers';

export default combineReducers({
  game: gameReducers,
});
