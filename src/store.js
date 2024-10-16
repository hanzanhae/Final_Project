import { combineReducers, createStore } from 'redux';
import themeReducer from './reducers/themeReducer';

const rootReducer = combineReducers({
  theme: themeReducer
});

export const store = createStore(rootReducer);
