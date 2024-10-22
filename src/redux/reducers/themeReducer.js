import { darkTheme, lightTheme } from '../../styles/theme';

const initialState = {
  isDarkMode: false,
  theme: lightTheme
};

const ThemeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_THEME':
      return {
        ...state,
        isDarkMode: action.payload === 'dark',
        theme: action.payload === 'dark' ? darkTheme : lightTheme
      };
    case 'TOGGLE_THEME':
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
        theme: state.isDarkMode ? lightTheme : darkTheme
      };
    default:
      return state;
  }
};

export default ThemeReducer;
