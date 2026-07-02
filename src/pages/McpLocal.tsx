import { useState } from 'react';

import {
  CheckCircleIcon,
  EditIcon,
  PlusIcon,
  RefreshIcon,
  ServerIcon,
  TrashIcon,
} from '../components/icons';
import './McpLocal.css';

type Status = 'disconnected' | 'connected' | 'testing';

const STATUS_LABEL: Record<Status, string> = {
  disconnected: 'Sin conexión',
  testing: 'Probando...',
  connected: 'Conectado',
};

export default function McpLocal() {
  const [status, setStatus] = useState<Status>('disconnected');
  const [url, setUrl] = useState('http://localhost:7420');
  const [token, setToken] = useState('');
  const [folders, setFolders] = useState<string[]>([]);
  const [folderInput, setFolderInput] = useState('');

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
  }

  function handleTest() {
    setStatus('testing');
    setTimeout(() => setStatus('connected'), 1400);
  }

  function addFolder() {
    const t = folderInput.trim();
    if (t && !folders.includes(t)) {
      setFolders((p) => [...p, t]);
      setFolderInput('');
    }
  }

  return (
    <div className="mcp">
      {/* encabezado */}
      <header className="page-header">
        <div>
          <h1 className="page-title mcp-head__title">
            <ServerIcon size={24} className="mcp-head__icon" />
            MCP Local
          </h1>
          <p className="mcp-head__sub">Acceso al filesystem del usuario desde los agentes</p>
        </div>
        <button
          type="button"
          className="btn btn--ghost mcp-refresh"
          title="Reconectar"
          onClick={handleTest}
        >
          <RefreshIcon size={16} className={status === 'testing' ? 'mcp-spin' : ''} />
        </button>
      </header>

      {/* ---- Estado de conexión ---- */}
      <section className="mcp-card">
        <h2 className="mcp-card__title">Estado de conexión</h2>

        <div className={`mcp-status mcp-status--${status}`}>
          <span className="mcp-status__dot" />
          {STATUS_LABEL[status]}
        </div>

        <form onSubmit={handleSave} className="mcp-form">
          <div className="mcp-field">
            <label className="mcp-field__label mono">URL DEL SERVIDOR</label>
            <input
              className="mcp-field__input"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="http://localhost:7420"
            />
          </div>

          <div className="mcp-field">
            <label className="mcp-field__label mono">
              TOKEN DE AUTENTICACIÓN
              <span className="mcp-field__opt">(opcional)</span>
            </label>
            <input
              className="mcp-field__input"
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Dejalo vacío si no configuraste token"
            />
          </div>

          <div className="mcp-actions">
            <button type="submit" className="btn btn--primary">
              <EditIcon size={14} /> Guardar
            </button>
            <button type="button" className="btn btn--ghost" onClick={handleTest}>
              <CheckCircleIcon size={14} /> Probar conexión
            </button>
          </div>
        </form>
      </section>

      {/* ---- Carpetas permitidas ---- */}
      <section className="mcp-card">
        <h2 className="mcp-card__title">Carpetas permitidas</h2>
        <p className="mcp-card__desc">
          Los agentes solo pueden acceder a archivos dentro de estas rutas. Usá rutas absolutas.
        </p>

        {folders.length === 0 ? (
          <p className="mcp-folders__empty">No hay carpetas configuradas.</p>
        ) : (
          <ul className="mcp-folders">
            {folders.map((f) => (
              <li key={f} className="mcp-folder">
                <span className="mcp-folder__path mono">{f}</span>
                <button
                  type="button"
                  className="icon-btn icon-btn--sm icon-btn--danger"
                  onClick={() => setFolders((p) => p.filter((x) => x !== f))}
                  aria-label={`Eliminar ${f}`}
                >
                  <TrashIcon size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mcp-add">
          <input
            className="mcp-field__input"
            value={folderInput}
            onChange={(e) => setFolderInput(e.target.value)}
            placeholder="Ej: C:\Users\usuario\Documentos"
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFolder())}
          />
          <button type="button" className="btn btn--ghost" onClick={addFolder}>
            <PlusIcon size={15} /> Agregar
          </button>
        </div>
      </section>

      {/* ---- Instalación ---- */}
      <section className="mcp-card">
        <h2 className="mcp-card__title">Instalación</h2>
        <p className="mcp-card__desc">
          El servidor MCP Local es un proceso Node.js que corre en tu computadora. Instalalo una
          vez y los agentes del hub tendrán acceso a tu filesystem.
        </p>

        <div className="mcp-install">
          <div className="mcp-install__label mono">Inicio manual</div>
          <pre className="mcp-code">{'cd mcp-local/ && npm install && node server.js'}</pre>
        </div>

        <div className="mcp-os-grid">
          <div className="mcp-os">
            <div className="mcp-os__head mono">
              <span className="mcp-os__prompt">{'>_'}</span> Windows
            </div>
            <p className="mcp-os__desc">
              Usá el instalador NSSM para registrarlo como servicio de Windows (inicio automático).
            </p>
            <pre className="mcp-code mcp-code--sm">{'mcp-local\\installer\\install.bat'}</pre>
          </div>

          <div className="mcp-os">
            <div className="mcp-os__head mono">
              <span className="mcp-os__prompt">{'>_'}</span> Mac / Linux
            </div>
            <p className="mcp-os__desc">
              Registrá un LaunchAgent (Mac) o servicio systemd (Linux).
            </p>
            <pre className="mcp-code mcp-code--sm">
              {'chmod +x mcp-local/installer/install.sh && ./install.sh'}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
