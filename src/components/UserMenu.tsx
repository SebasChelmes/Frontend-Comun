import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ChevronDownIcon,
  DocIcon,
  GlobeIcon,
  HelpIcon,
  InfoIcon,
  LogoutIcon,
  PlanIcon,
  PlayCircleIcon,
  ScaleIcon,
  SettingsIcon,
  ShieldIcon,
} from './icons';
import './UserMenu.css';

const LANGUAGES = ['Español', 'English'];
const MORE_INFO = [
  { label: 'Tutoriales', Icon: PlayCircleIcon },
  { label: 'Términos y Condiciones', Icon: ScaleIcon },
  { label: 'Políticas de uso', Icon: DocIcon },
  { label: 'Políticas de privacidad y seguridad', Icon: ShieldIcon },
];

/** Menú desplegable del usuario (abre hacia arriba desde el footer del sidebar). */
export function UserMenu({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const [section, setSection] = useState<'idioma' | 'info' | null>(null);
  const [lang, setLang] = useState('Español');
  const toggle = (s: 'idioma' | 'info') => setSection((cur) => (cur === s ? null : s));

  return (
    <div className="um" role="menu">
      <div className="um__head">
        <div className="um__head-name">Martina Ríos</div>
        <div className="um__head-mail mono">martina@empresa.com</div>
      </div>

      <div className="um__group">
        <button className="um__item" role="menuitem">
          <SettingsIcon size={17} className="um__ico" />
          Configuración
          <span className="um__shortcut mono">Ctrl ,</span>
        </button>

        <button className="um__item" onClick={() => toggle('idioma')} aria-expanded={section === 'idioma'}>
          <GlobeIcon size={17} className="um__ico" />
          Idioma
          <ChevronDownIcon size={14} className={`um__chev ${section === 'idioma' ? 'is-open' : ''}`} />
        </button>
        {section === 'idioma' && (
          <div className="um__sub">
            {LANGUAGES.map((l) => (
              <button
                key={l}
                className={`um__subitem ${lang === l ? 'is-active' : ''}`}
                onClick={() => setLang(l)}
              >
                {l}
                {lang === l && <span className="um__radio" />}
              </button>
            ))}
          </div>
        )}

        <button className="um__item" role="menuitem">
          <HelpIcon size={17} className="um__ico" />
          Obtener ayuda
        </button>
      </div>

      <div className="um__divider" />

      <div className="um__group">
        <button
          className="um__item"
          role="menuitem"
          onClick={() => {
            onClose();
            // navega a Plan / Suscripción (sección de cuenta)
          }}
        >
          <PlanIcon size={17} className="um__ico" />
          Plan / Suscripción
        </button>

        <button className="um__item" onClick={() => toggle('info')} aria-expanded={section === 'info'}>
          <InfoIcon size={17} className="um__ico" />
          Más información
          <ChevronDownIcon size={14} className={`um__chev ${section === 'info' ? 'is-open' : ''}`} />
        </button>
        {section === 'info' && (
          <div className="um__sub">
            {MORE_INFO.map(({ label, Icon }) => (
              <button key={label} className="um__subitem um__subitem--ico">
                <Icon size={15} className="um__subico" />
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="um__divider" />

      <div className="um__group">
        <button className="um__item um__item--logout" onClick={() => navigate('/login')}>
          <LogoutIcon size={17} className="um__ico" />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
