import { combineReducers, createStore } from 'redux';
import { ThemeReducer, FilterReducer } from '../config/ThemeReducer';

const rootReducer = combineReducers({
  theme: ThemeReducer,
  filter: FilterReducer
});

export const store = createStore(rootReducer);
