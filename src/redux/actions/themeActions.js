export const setTheme = (theme) => {
  return {
    type: 'SET_THEME',
    payload: theme
  };
};

export const toggleTheme = () => {
  return {
    type: 'TOGGLE_THEME'
  };
};
