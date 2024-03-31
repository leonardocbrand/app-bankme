import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './services/queryClient.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={ queryClient }>
      <App />
    </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
