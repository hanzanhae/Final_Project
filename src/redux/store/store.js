import { combineReducers, createStore } from 'redux';
import ThemeReducer from '../reducers/themeReducer';
import userReducer from '../reducers/userReducer';

const rootReducer = combineReducers({
  theme: ThemeReducer,
  user: userReducer
});

export const store = createStore(rootReducer);
