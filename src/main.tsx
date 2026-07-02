import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { AppShell } from './components/AppShell';
import { AgentsProvider } from './context/AgentsContext';
import { AppProvider } from './context/AppContext';
import AgentDetail from './pages/AgentDetail';
import Agentes from './pages/Agentes';
import Automatizaciones from './pages/Automatizaciones';
import Comandos from './pages/Comandos';
import Conectores from './pages/Conectores';
import Inicio from './pages/Inicio';
import McpLocal from './pages/McpLocal';
import Login from './pages/Login';
import Procesos from './pages/Procesos';
import PanelDeAgencia from './pages/PanelDeAgencia';
import Skills from './pages/Skills';
import './styles/global.css';

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '/login', element: <Login /> },
  {
    // layout persistente (sidebar + top bar) — no se desmonta al navegar
    element: <AppShell />,
    children: [
      { path: '/inicio', element: <Inicio /> },
      { path: '/procesos', element: <Procesos /> },
      { path: '/agentes', element: <Agentes /> },
      { path: '/agentes/:id', element: <AgentDetail /> },
      { path: '/conectores', element: <Conectores /> },
      { path: '/mcp-local', element: <McpLocal /> },
      { path: '/skills', element: <Skills /> },
      { path: '/comandos', element: <Comandos /> },
      { path: '/automatizaciones', element: <Automatizaciones /> },
      { path: '/panel-de-agencia', element: <PanelDeAgencia /> },
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
