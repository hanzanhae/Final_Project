export const setTheme = (theme) => {
  return {
    type: 'SET_THEME',
    payload: theme
  };
};

// 'TOGGLE_THEME' 액션 생성 함수
export const toggleTheme = () => {
  return {
    type: 'TOGGLE_THEME'
  };
};
