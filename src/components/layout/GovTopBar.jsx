import React from 'react';
import { SunMoon, RotateCcw, ExternalLink, ShieldCheck } from 'lucide-react';
import { useAcademic } from '../../context/AcademicContext';

/**
 * Barra superior institucional inspirada no Portal do Governo de Sergipe
 * e da SEDUC-SE (https://seduc.se.gov.br/).
 */
export default function GovTopBar() {
  const { highContrast, setHighContrast, resetDemoData } = useAcademic();

  return (
    <div className="gov-topbar">
      <div className="gov-topbar-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
          <a
            href="https://seduc.se.gov.br/"
            target="_blank"
            rel="noreferrer"
            className="gov-brand-pill"
            title="Acessar Portal Oficial SEDUC Sergipe"
          >
            <span className="gov-sergipe-flag-dots" aria-hidden="true">
              <span className="gov-dot green" />
              <span className="gov-dot gold" />
              <span className="gov-dot blue" />
            </span>
            <span>GOVERNO DE SERGIPE • SEDUC / SEED</span>
            <ExternalLink size={12} />
          </a>
          <span style={{ opacity: 0.78, fontSize: '0.74rem' }}>
            Secretaria de Estado da Educação e da Cultura
          </span>
        </div>

        <div className="gov-actions">
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.73rem',
              opacity: 0.9,
            }}
          >
            <ShieldCheck size={13} color="#FFB900" />
            Ano Letivo 2026 • Rede Estadual
          </span>

          <button
            type="button"
            className="gov-link-btn"
            onClick={() => setHighContrast(!highContrast)}
            title="Alternar Modo de Alto Contraste (Acessibilidade)"
          >
            <SunMoon size={13} />
            {highContrast ? 'Contraste Padrão' : 'Alto Contraste'}
          </button>

          <button
            type="button"
            className="gov-link-btn"
            onClick={resetDemoData}
            title="Restaurar os dados iniciais de demonstração"
          >
            <RotateCcw size={13} />
            Restaurar Dados Demo
          </button>
        </div>
      </div>
    </div>
  );
}
