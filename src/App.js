import Router from './shared/Router';
import React, { useEffect } from 'react';
import GlobalStyle from './styles/GlobalStyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from './styles/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

function App() {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const currentTheme = isDarkMode ? darkTheme : lightTheme;
  useEffect(() => {
    if (!window.Kakao || !window.Kakao.isInitialized()) {
      const kakaoScript = document.createElement('script');
      kakaoScript.src =
        'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
      kakaoScript.integrity =
        'sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4';
      kakaoScript.crossOrigin = 'anonymous';

      kakaoScript.onload = () => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init(process.env.REACT_APP_KAKAOLOGIN_APP_KEY);
        }
      };

      document.head.appendChild(kakaoScript);
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
