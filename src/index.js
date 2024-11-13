import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

const Root = () => {
  useEffect(() => {
    const handleLoad = () => {
      const loadingElement = document.getElementById('loading');
      loadingElement.style.display = 'none';
    };
    window.addEventListener('load', handleLoad);

    setTimeout(handleLoad, 500);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  );
};

root.render(<Root />);
reportWebVitals();
