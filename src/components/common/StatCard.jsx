import React from 'react';

/**
 * Componente reutilizável para exibir indicadores-chave (KPIs)
 * Exemplo claro de uso de Props e desestruturação para alunos do 2º período.
 */
export default function StatCard({ label, value, subtitle, icon: Icon, variant = 'blue' }) {
  return (
    <div className="stat-card">
      <div>
        <div className="stat-card-label">{label}</div>
        <div className="stat-card-value">{value}</div>
        {subtitle && <div className="stat-card-sub">{subtitle}</div>}
      </div>
      {Icon && (
        <div className={`stat-icon-box ${variant}`}>
          <Icon size={22} />
        </div>
      )}
    </div>
  );
}
