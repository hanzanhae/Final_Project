import { combineReducers, createStore } from 'redux';
import userReducer from '../reducers/userReducer';
import ThemeReducer from '../reducers/themeReducer';
import FilterReducer from '../reducers/filterReducer';
import UnreadMessagesReducer from '../reducers/unreadMessagesReducer';
const rootReducer = combineReducers({
  theme: ThemeReducer,
  filter: FilterReducer,
  user: userReducer,
  unreadMessages: UnreadMessagesReducer
});

export const store = createStore(rootReducer);
