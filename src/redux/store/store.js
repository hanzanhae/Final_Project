import { combineReducers, createStore } from 'redux';
import ThemeReducer from '../config/ThemeReducer';

const rootReducer = combineReducers({
  theme: ThemeReducer
});

export const store = createStore(rootReducer);
