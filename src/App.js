import Router from './shared/Router';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from './theme';
import { GlobalStyles } from './styles/GlobalStyles';

function App() {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <Router />
    </ThemeProvider>
  );
}

export default App;
