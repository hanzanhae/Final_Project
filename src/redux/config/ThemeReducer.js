import { darkTheme, lightTheme } from '../../theme';

const initialState = {
  isDarkMode: false,
  theme: lightTheme
};

const ThemeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'WEATHER_THEME':
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
