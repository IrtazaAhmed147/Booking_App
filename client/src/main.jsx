import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { SearchContextProvider } from './context/searchContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchContextProvider>
      <App />
    </SearchContextProvider>
  </StrictMode>
);
