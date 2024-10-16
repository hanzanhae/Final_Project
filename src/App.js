import Router from './shared/Router';
import './App.css';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from './theme';

function App() {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;
