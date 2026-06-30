import { useState, type ComponentType } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { AppShell } from '../components/AppShell';
import {
  BookIcon,
  CalendarIcon,
  ChatIcon,
  FolderIcon,
  InboxIcon,
  PaperclipIcon,
  PlugIcon,
  SendIcon,
  TerminalIcon,
  UserIcon,
} from '../components/icons';
import { AGENTS, STATUS_META, type Agent } from '../data/agents';
import './AgentDetail.css';

type IconType = ComponentType<{ size?: number }>;
type TabId = 'chat' | 'archivos' | 'agenda' | 'comandos' | 'skills' | 'conectores' | 'bandeja';

const TABS: { id: TabId; label: string; Icon: IconType }[] = [
  { id: 'chat', label: 'Chat', Icon: ChatIcon },
  { id: 'archivos', label: 'Archivos', Icon: FolderIcon },
  { id: 'agenda', label: 'Agenda', Icon: CalendarIcon },
  { id: 'comandos', label: 'Comandos', Icon: TerminalIcon },
  { id: 'skills', label: 'Skills', Icon: BookIcon },
  { id: 'conectores', label: 'Conectores', Icon: PlugIcon },
  { id: 'bandeja', label: 'Bandeja', Icon: InboxIcon },
];

export default function AgentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabId>('chat');

  const agent = AGENTS.find((a) => a.id === id);
  if (!agent) return <Navigate to="/agentes" replace />;

  const status = STATUS_META[agent.status];

  return (
    <AppShell crumb={`INTELIGENCIA / AGENTES / ${agent.name.toUpperCase()}`}>
      <div className="ad">
        {/* breadcrumb + identidad */}
        <div className="ad__crumb mono">
          <span className="ad__crumb-link" onClick={() => navigate('/agentes')}>Hub de Agentes</span>
          <span className="ad__crumb-sep">›</span>
          <span>{agent.name}</span>
        </div>

        <header className="ad__head">
          <Avatar agent={agent} />
          <div className="ad__id">
            <h1 className="ad__name">{agent.name}</h1>
            <div className="ad__role mono">{agent.category}</div>
          </div>
          <span className="ad__status">
            <span className="ad__status-dot" style={{ background: status.color }} />
            {status.label}
          </span>
        </header>

        {/* tabs */}
        <nav className="ad__tabs">
          {TABS.map(({ id: tid, label, Icon }) => (
            <button
              key={tid}
              className={`ad__tab ${tab === tid ? 'is-active' : ''}`}
              onClick={() => setTab(tid)}
              title={label}
              aria-label={label}
            >
              <Icon size={19} />
            </button>
          ))}
        </nav>

        {/* panel */}
        {tab === 'chat' ? (
          <ChatPanel agent={agent} />
        ) : (
          <EmptyPanel label={TABS.find((t) => t.id === tab)!.label} agent={agent} Icon={TABS.find((t) => t.id === tab)!.Icon} />
        )}
      </div>
    </AppShell>
  );
}

/* ---------- Chat ---------- */
function ChatPanel({ agent }: { agent: Agent }) {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  function send() {
    const t = text.trim();
    if (!t) return;
    setMessages((m) => [...m, t]);
    setText('');
  }

  return (
    <div className="ad__panel ad__chat">
      <div className="ad__chat-sub mono">
        Hablando con <b>{agent.name}</b> — {agent.category}
      </div>

      <div className="ad__chat-body">
        {messages.length === 0 ? (
          <div className="ad__empty">
            <span className="ad__empty-ico"><ChatIcon size={22} /></span>
            <p className="ad__empty-text">
              Iniciá la conversación con <b>{agent.name}</b>
            </p>
          </div>
        ) : (
          <div className="ad__msgs">
            {messages.map((m, i) => (
              <div className="ad__msg" key={i}>{m}</div>
            ))}
          </div>
        )}
      </div>

      <div className="ad__composer">
        <button className="ad__attach" aria-label="Adjuntar archivo" title="Adjuntar archivo">
          <PaperclipIcon size={18} />
        </button>
        <input
          className="ad__input"
          placeholder={`Escribile a ${agent.name}…`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
        />
        <button className="ad__send" onClick={send} aria-label="Enviar" disabled={!text.trim()}>
          <SendIcon size={17} />
        </button>
      </div>
    </div>
  );
}

/* ---------- otras tabs (placeholder) ---------- */
function EmptyPanel({ label, agent, Icon }: { label: string; agent: Agent; Icon: IconType }) {
  return (
    <div className="ad__panel ad__placeholder">
      <div className="ad__empty">
        <span className="ad__empty-ico"><Icon size={22} /></span>
        <p className="ad__empty-title">{label}</p>
        <p className="ad__empty-text">
          {label} de <b>{agent.name}</b> — disponible próximamente.
        </p>
      </div>
    </div>
  );
}

function Avatar({ agent }: { agent: Agent }) {
  if (agent.avatarImage) {
    return <img className="ad__avatar ad__avatar--img" src={agent.avatarImage} alt="" />;
  }
  return (
    <span className="ad__avatar ad__avatar--empty" aria-hidden>
      <UserIcon size={26} />
    </span>
  );
}
