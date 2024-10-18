import { darkTheme, lightTheme } from '../../styles/theme';

const initialState = {
  isDarkMode: false,
  theme: lightTheme
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
        theme: state.isDarkMode ? lightTheme : darkTheme
      };
    case 'SET_THEME':
      return {
        ...state,
        isDarkMode: action.payload === 'dark',
        theme: action.payload === 'dark' ? darkTheme : lightTheme
      };
    default:
      return state;
  }
};

export default themeReducer;
