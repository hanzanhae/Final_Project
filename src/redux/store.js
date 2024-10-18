import { combineReducers, createStore } from 'redux';
import themeReducer from '../redux/reducers/themeReducer';

const rootReducer = combineReducers({
  theme: themeReducer
});

export const store = createStore(rootReducer);
