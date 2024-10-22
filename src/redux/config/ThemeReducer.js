import { darkTheme, lightTheme } from '../../styles/theme';

const ThemeInitialState = {
  isDarkMode: false,
  theme: lightTheme
};

const FilterInitialState = {
  selectedOption: null,
  selectedDistance: null,
  selectedCategory: []
};

export const ThemeReducer = (state = ThemeInitialState, action) => {
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

export const FilterReducer = (state = FilterInitialState, action) => {
  switch (action.type) {
    case 'SELECTED_OPTION':
      return { ...state, selectedOption: action.payload };
    case 'SELECTED_DISTANCE':
      return { ...state, selectedDistance: action.payload };
    case 'SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    default:
      return state;
  }
};
