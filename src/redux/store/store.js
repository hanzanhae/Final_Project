import { combineReducers, createStore } from 'redux';
import userReducer from '../reducers/userReducer';
import ThemeReducer from '../reducers/themeReducer';
import FilterReducer from '../reducers/filterReducer';

const rootReducer = combineReducers({
  theme: ThemeReducer,
  filter: FilterReducer,
  user: userReducer
});

export const store = createStore(rootReducer);
