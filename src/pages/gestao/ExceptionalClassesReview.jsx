import React, { useState } from 'react';
import {
  Gavel,
  CheckCircle2,
  XCircle,
  Clock,
  CalendarClock,
  FileText,
  Filter,
} from 'lucide-react';
import { useAcademic } from '../../context/AcademicContext';

/**
 * ============================================================================
 * TELA ADM (GESTÃO ACADÊMICA / DIES): ANÁLISE E DECISÃO DE AULAS EXCEPCIONAIS
 * ============================================================================
 * Atende ao requisito:
 * "Implementar o painel de análise e decisão para deferimento das solicitações
 * de aulas excepcionais enviadas pelos professores."
 */
export default function ExceptionalClassesReview() {
  const { exceptionalRequests, reviewExceptionalRequest } = useAcademic();

  const [statusFilter, setStatusFilter] = useState('TODOS');
  const [notesMap, setNotesMap] = useState({});

  const filteredRequests = exceptionalRequests.filter((req) => {
    if (statusFilter === 'TODOS') return true;
    return req.status === statusFilter;
  });

  const handleNoteChange = (reqId, text) => {
    setNotesMap((prev) => ({ ...prev, [reqId]: text }));
  };

  const handleDecision = (reqId, decision) => {
    const customNote = notesMap[reqId];
    reviewExceptionalRequest(reqId, decision, customNote);
  };

  return (
    <div className="page-container">
      <div className="page-hero">
        <div>
          <div className="page-hero-tag">
            <Gavel size={15} />
            Coordenação Pedagógica & Inspeção • Deliberação de Solicitações
          </div>
          <h2>Painel de Análise e Deferimento de Aulas Excepcionais</h2>
          <p>
            Analise os pedidos de <strong>Reposição</strong> ou <strong>Antecipação de Aula</strong>{' '}
            enviados pelos professores no Diário Eletrônico e emita o parecer oficial de deferimento.
          </p>
        </div>

        {/* Filtros Rápidos por Status */}
        <div className="subtabs-bar" aria-label="Filtrar solicitações por status">
          <Filter size={15} style={{ margin: 'auto 0.4rem', color: 'var(--seduc-text-muted)' }} />
          {['TODOS', 'Pendente', 'Deferida', 'Indeferida'].map((st) => (
            <button
              key={st}
              type="button"
              className={`subtab-btn ${statusFilter === st ? 'active' : ''}`}
              onClick={() => setStatusFilter(st)}
            >
              {st === 'TODOS' ? 'Todas' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Solicitações */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
        {filteredRequests.length === 0 ? (
          <div className="section-card">
            <div className="section-card-body" style={{ textAlign: 'center', padding: '2.5rem' }}>
              <CalendarClock size={36} color="var(--seduc-text-muted)" />
              <h3 style={{ marginTop: '0.5rem' }}>Nenhuma solicitação encontrada neste filtro</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--seduc-text-secondary)' }}>
                Altere o filtro acima ou cadastre um novo pedido no perfil Professor.
              </p>
            </div>
          </div>
        ) : (
          filteredRequests.map((req) => {
            const isPending = req.status === 'Pendente';
            const isApproved = req.status === 'Deferida';

            return (
              <section
                key={req.id}
                className="section-card"
                style={{
                  borderLeft: `6px solid ${
                    isPending
                      ? 'var(--seduc-gold)'
                      : isApproved
                      ? 'var(--seduc-green)'
                      : 'var(--seduc-danger)'
                  }`,
                }}
              >
                <div className="section-card-body">
                  {/* Cabeçalho da Solicitação */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      flexWrap: 'wrap',
                      marginBottom: '0.9rem',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          flexWrap: 'wrap',
                        }}
                      >
                        <span className="badge badge-blue">{req.protocol}</span>
                        <span
                          className={`badge ${
                            req.type.includes('Reposição') ? 'badge-gold' : 'badge-blue'
                          }`}
                        >
                          {req.type}
                        </span>
                        <span style={{ fontSize: '0.76rem', color: 'var(--seduc-text-muted)' }}>
                          Solicitado em {req.createdAt}
                        </span>
                      </div>

                      <h3 style={{ fontSize: '1.08rem', marginTop: '0.4rem' }}>
                        {req.disciplineName} — Turma {req.className}
                      </h3>
                      <p style={{ fontSize: '0.82rem', color: 'var(--seduc-text-secondary)' }}>
                        Docente Solicitante: <strong>{req.teacherName}</strong> • Unidade:{' '}
                        <strong>{req.schoolName}</strong>
                      </p>
                    </div>

                    {/* Badge de Status Atual */}
                    <div>
                      {isPending && (
                        <span className="badge badge-gold">
                          <Clock size={14} /> Pendente de Deferimento
                        </span>
                      )}
                      {isApproved && (
                        <span className="badge badge-green">
                          <CheckCircle2 size={14} /> Solicitação Deferida
                        </span>
                      )}
                      {req.status === 'Indeferida' && (
                        <span className="badge badge-danger">
                          <XCircle size={14} /> Solicitação Indeferida
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Detalhes da Data Original vs Nova Data Proposta */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                      gap: '0.85rem',
                      padding: '0.9rem',
                      borderRadius: '8px',
                      background: 'var(--seduc-bg-page)',
                      border: '1px solid var(--seduc-border-light)',
                      marginBottom: '0.95rem',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--seduc-text-muted)' }}>
                        DATA ORIGINAL DA AULA
                      </div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{req.originalDate}</div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--seduc-text-muted)' }}>
                        NOVA DATA PROPOSTA ({req.type.toUpperCase()})
                      </div>
                      <div
                        style={{
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          color: 'var(--seduc-blue-primary)',
                        }}
                      >
                        {req.proposedDate}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--seduc-text-muted)' }}>
                        HORÁRIO / ESPAÇO SOLICITADO
                      </div>
                      <div style={{ fontSize: '0.84rem', fontWeight: 600 }}>{req.proposedSlot}</div>
                    </div>
                  </div>

                  {/* Justificativa e Plano Pedagógico */}
                  <div className="two-col-equal" style={{ marginBottom: '1rem' }}>
                    <div
                      style={{
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: '1px solid var(--seduc-border-light)',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          color: 'var(--seduc-text-secondary)',
                          marginBottom: '0.25rem',
                        }}
                      >
                        <FileText size={13} style={{ display: 'inline' }} /> JUSTIFICATIVA DO PROFESSOR:
                      </div>
                      <p style={{ fontSize: '0.83rem' }}>{req.reason}</p>
                    </div>

                    <div
                      style={{
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: '1px solid var(--seduc-border-light)',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          color: 'var(--seduc-text-secondary)',
                          marginBottom: '0.25rem',
                        }}
                      >
                        PLANO DE AULA / TÓPICOS PREVISTOS:
                      </div>
                      <p style={{ fontSize: '0.83rem' }}>{req.pedagogicalPlan}</p>
                    </div>
                  </div>

                  {/* Área de Decisão (Parecer + Botões de Deferir / Indeferir) */}
                  <div
                    style={{
                      paddingTop: '0.9rem',
                      borderTop: '1px solid var(--seduc-border-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div style={{ flex: 1, minWidth: '260px' }}>
                      <label className="form-label" style={{ marginBottom: '0.3rem' }}>
                        Parecer Técnico da Gestão Acadêmica / Coordenação:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Informe o despacho pedagógico (ex: Deferido conforme disponibilidade do laboratório e calendário letivo)..."
                        value={
                          notesMap[req.id] !== undefined ? notesMap[req.id] : req.reviewerNote
                        }
                        onChange={(e) => handleNoteChange(req.id, e.target.value)}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => handleDecision(req.id, 'Deferida')}
                      >
                        <CheckCircle2 size={16} />
                        Deferir Solicitação
                      </button>

                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDecision(req.id, 'Indeferida')}
                      >
                        <XCircle size={16} />
                        Indeferir
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            );
          })
        )}
      </div>
    </div>
  );
}
