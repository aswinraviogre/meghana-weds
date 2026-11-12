import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/theme1.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

