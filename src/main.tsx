import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { AppProvider } from './context/AppContext';
import AgentDetail from './pages/AgentDetail';
import Agentes from './pages/Agentes';
import Login from './pages/Login';
import Procesos from './pages/Procesos';
import './styles/global.css';

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '/login', element: <Login /> },
  { path: '/procesos', element: <Procesos /> },
  { path: '/agentes', element: <Agentes /> },
  { path: '/agentes/:id', element: <AgentDetail /> },
  { path: '*', element: <Navigate to="/login" replace /> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>,
);
