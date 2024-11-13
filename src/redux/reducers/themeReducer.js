import { darkTheme, lightTheme } from '../../styles/theme';

const themeInitialState = {
  isDarkMode: false,
  theme: lightTheme
};

const ThemeReducer = (state = themeInitialState, action) => {
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
