import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BrandGlyph } from '../components/BrandMark';
import { ArrowRightIcon, EyeIcon, EyeOffIcon, MailIcon } from '../components/icons';
import { DesignControls } from '../components/DesignControls';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('martina@empresa.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function enter(e: React.FormEvent) {
    e.preventDefault();
    navigate('/inicio');
  }

  return (
    <div className="login-screen">
      <div className="login-eyebrow mono">LOGIN · /login</div>

      <form className="login-card" onSubmit={enter}>
        {/* brand panel */}
        <div className="login-brand">
          <div className="login-brand__ghost" aria-hidden>S</div>

          <div className="login-brand__top">
            <BrandGlyph size={30} radius={9} font={16} />
            <span className="login-brand__word">Sebach AI</span>
          </div>

          <div className="login-brand__mid">
            <h1>Una sola plataforma para tus procesos.</h1>
            <p>Mapeá, analizá y automatizá — todo en un mismo lugar, con un solo acceso.</p>
          </div>

          <div className="login-brand__foot mono">PLATAFORMA SEBACH AI</div>
        </div>

        {/* form panel */}
        <div className="login-form">
          <div className="login-form__inner">
            <div className="login-form__kicker mono">ACCESO ÚNICO</div>
            <h2 className="login-form__title">Iniciá sesión</h2>

            <div className="field">
              <label className="field__label mono" htmlFor="email">EMAIL</label>
              <input
                id="email"
                className="field__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="field">
              <div className="field__row">
                <label className="field__label mono" htmlFor="password">CONTRASEÑA</label>
                <a className="field__link">¿La olvidaste?</a>
              </div>
              <div className="field__pw">
                <input
                  id="password"
                  className="field__input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="field__eye"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn--primary btn--block login-submit">
              Entrar <ArrowRightIcon size={16} />
            </button>

            <div className="login-or">
              <div className="login-or__line" />
              <span>o</span>
              <div className="login-or__line" />
            </div>

            <button type="button" className="btn btn--ghost btn--block">
              <MailIcon size={17} /> Enviarme un magic link
            </button>

            <p className="login-foot">
              ¿Tu empresa todavía no está? <a className="login-foot__link">Solicitar acceso</a>
            </p>
          </div>
        </div>
      </form>

      <DesignControls />
    </div>
  );
}
