import {combineReducers} from 'redux-immutable';

import home from './pages/home/reducer';
import me from './pages/me/reducer';

const reducers = combineReducers({
  home, 
  me
});

export default reducers;
