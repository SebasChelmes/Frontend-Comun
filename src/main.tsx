import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { AppShell } from './components/AppShell';
import { AgentsProvider } from './context/AgentsContext';
import { AppProvider } from './context/AppContext';
import AgentDetail from './pages/AgentDetail';
import Agentes from './pages/Agentes';
import Login from './pages/Login';
import Procesos from './pages/Procesos';
import './styles/global.css';

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '/login', element: <Login /> },
  {
    // layout persistente (sidebar + top bar) — no se desmonta al navegar
    element: <AppShell />,
    children: [
      { path: '/procesos', element: <Procesos /> },
      { path: '/agentes', element: <Agentes /> },
      { path: '/agentes/:id', element: <AgentDetail /> },
    ],
  },
  { path: '*', element: <Navigate to="/login" replace /> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <AgentsProvider>
        <RouterProvider router={router} />
      </AgentsProvider>
    </AppProvider>
  </StrictMode>,
);
