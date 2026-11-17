import React, { useState } from 'react';
import {
  Landmark,
  FileBadge,
  School,
  PlusCircle,
  CheckCircle2,
  MapPin,
  FileText,
  Layers,
} from 'lucide-react';
import { useAcademic } from '../../context/AcademicContext';
import StatCard from '../../components/common/StatCard';

/**
 * ============================================================================
 * TELA ADM (DIES): PORTARIAS NORMATIVAS & CRIAÇÃO DE UNIDADES ESCOLARES
 * ============================================================================
 * Atende ao requisito:
 * "DIES - Responsável por criar portarias e autorizar criação de novas matrizes
 * curriculares, por criar novas escolas."
 */
export default function DiesDashboard() {
  const { ordinances, schools, matrices, courses, addOrdinance, addSchool } = useAcademic();

  // Estado do formulário de Nova Portaria DIES
  const [ordForm, setOrdForm] = useState({
    number: 'Portaria SEDUC/DIES nº 230/2026',
    publishDate: new Date().toISOString().slice(0, 10),
    type: 'Homologação de Matriz Curricular',
    summary: '',
  });

  // Estado do formulário de Criação/Credenciamento de Nova Escola
  const [schoolForm, setSchoolForm] = useState({
    inep: '',
    name: '',
    dre: 'DEA - Diretoria de Educação de Aracaju',
    city: 'Aracaju / SE',
    modality: 'Ensino Médio em Tempo Integral e Profissional',
    OrdinanceRef: ordinances[0]?.number || 'Portaria SEDUC/DIES nº 114/2026',
    status: 'Ativa',
  });

  const handleCreateOrdinance = (e) => {
    e.preventDefault();
    if (!ordForm.number.trim() || !ordForm.summary.trim()) return;
    addOrdinance(ordForm);
    setOrdForm({
      number: `Portaria SEDUC/DIES nº ${Math.floor(231 + Math.random() * 150)}/2026`,
      publishDate: new Date().toISOString().slice(0, 10),
      type: 'Homologação de Matriz Curricular',
      summary: '',
    });
  };

  const handleCreateSchool = (e) => {
    e.preventDefault();
    if (!schoolForm.name.trim() || !schoolForm.inep.trim()) return;
    addSchool(schoolForm);
    setSchoolForm({
      ...schoolForm,
      inep: '',
      name: '',
    });
  };

  const authorizedMatricesCount = matrices.filter((m) => m.authorizedByDies).length;

  return (
    <div className="page-container">
      {/* Cabeçalho da Página */}
      <div className="page-hero">
        <div>
          <div className="page-hero-tag">
            <Landmark size={15} />
            Módulo Administrativo • DIES / SEDUC Sergipe
          </div>
          <h2>Inspeção Escolar, Portarias e Credenciamento de Escolas</h2>
          <p>
            Emita portarias normativas, crie novas unidades escolares da rede estadual e autorize a
            implantação de cursos e matrizes pela Gestão Acadêmica.
          </p>
        </div>
        <span className="badge badge-blue">Órgão Normativo Oficial</span>
      </div>

      {/* KPIs da DIES */}
      <div className="stats-grid">
        <StatCard
          label="Portarias Publicadas (DIES)"
          value={ordinances.length}
          subtitle="Atos normativos vigentes em 2026"
          icon={FileBadge}
          variant="blue"
        />
        <StatCard
          label="Escolas Credenciadas"
          value={schools.length}
          subtitle="Unidades na Rede Estadual SEDUC-SE"
          icon={School}
          variant="green"
        />
        <StatCard
          label="Cursos Homologados"
          value={courses.length}
          subtitle="Catálogo oficial de cursos"
          icon={FileText}
          variant="gold"
        />
        <StatCard
          label="Matrizes Autorizadas"
          value={`${authorizedMatricesCount}/${matrices.length}`}
          subtitle="Prontas para a Gestão Acadêmica"
          icon={Layers}
          variant="blue"
        />
      </div>

      {/* Grid Duplo: 1. Emitir Portaria | 2. Cadastrar Nova Escola */}
      <div className="two-col-equal">
        {/* Painel 1: Emissão de Portaria DIES */}
        <section className="section-card">
          <div className="section-card-header">
            <div>
              <div className="section-card-title">
                <FileBadge size={19} color="#164194" />
                Emitir Nova Portaria Normativa (DIES)
              </div>
              <div className="section-card-subtitle">
                Ato legal que respalda a criação de escolas, cursos e matrizes curriculares
              </div>
            </div>
          </div>

          <div className="section-card-body">
            <form onSubmit={handleCreateOrdinance} className="form-grid">
              <div className="form-group col-8">
                <label className="form-label">
                  Número da Portaria DIES/SEDUC <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={ordForm.number}
                  onChange={(e) => setOrdForm({ ...ordForm, number: e.target.value })}
                  placeholder="Ex: Portaria SEDUC/DIES nº 230/2026"
                  required
                />
              </div>

              <div className="form-group col-4">
                <label className="form-label">Data D.O.E.</label>
                <input
                  type="date"
                  className="form-control"
                  value={ordForm.publishDate}
                  onChange={(e) => setOrdForm({ ...ordForm, publishDate: e.target.value })}
                  required
                />
              </div>

              <div className="form-group col-12">
                <label className="form-label">Finalidade Normativa da Portaria</label>
                <select
                  className="form-control"
                  value={ordForm.type}
                  onChange={(e) => setOrdForm({ ...ordForm, type: e.target.value })}
                >
                  <option value="Homologação de Matriz Curricular">
                    Homologação de Matriz Curricular
                  </option>
                  <option value="Autorização de Curso e Matriz">
                    Autorização de Curso e Matriz
                  </option>
                  <option value="Credenciamento de Unidade Escolar">
                    Credenciamento / Criação de Unidade Escolar
                  </option>
                  <option value="Diretrizes de Calendário Escolar">
                    Diretrizes de Calendário Escolar
                  </option>
                </select>
              </div>

              <div className="form-group col-12">
                <label className="form-label">
                  Ementa / Objeto de Autorização <span className="required">*</span>
                </label>
                <textarea
                  className="form-control"
                  value={ordForm.summary}
                  onChange={(e) => setOrdForm({ ...ordForm, summary: e.target.value })}
                  placeholder="Descreva a autorização concedida pela DIES (ex: Autoriza a criação e funcionamento da Matriz Curricular...)"
                  required
                />
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <PlusCircle size={17} />
                  Publicar Portaria DIES
                </button>
              </div>
            </form>

            {/* Listagem de Portarias Recentes */}
            <div style={{ marginTop: '1.25rem' }}>
              <div
                style={{
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--seduc-text-secondary)',
                  marginBottom: '0.6rem',
                }}
              >
                Portarias Vigentes na Rede ({ordinances.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {ordinances.map((ord) => (
                  <div
                    key={ord.id}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '1px solid var(--seduc-border-light)',
                      background: 'var(--seduc-bg-page)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.25rem',
                      }}
                    >
                      <strong style={{ fontSize: '0.85rem', color: 'var(--seduc-blue-primary)' }}>
                        {ord.number}
                      </strong>
                      <span className="badge badge-green">
                        <CheckCircle2 size={12} /> {ord.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>
                      {ord.type} • Publicada em {ord.publishDate}
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--seduc-text-secondary)' }}>
                      {ord.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Painel 2: Criação de Nova Escola (Unidade de Ensino SEDUC-SE) */}
        <section className="section-card">
          <div className="section-card-header">
            <div>
              <div className="section-card-title">
                <School size={19} color="#164194" />
                Criar / Credenciar Nova Escola na Rede
              </div>
              <div className="section-card-subtitle">
                Unidades criadas pela DIES ficam disponíveis para implementação na Gestão Acadêmica
              </div>
            </div>
          </div>

          <div className="section-card-body">
            <form onSubmit={handleCreateSchool} className="form-grid">
              <div className="form-group col-4">
                <label className="form-label">
                  Código INEP <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={schoolForm.inep}
                  onChange={(e) => setSchoolForm({ ...schoolForm, inep: e.target.value })}
                  placeholder="Ex: 28031099"
                  maxLength={8}
                  required
                />
              </div>

              <div className="form-group col-8">
                <label className="form-label">
                  Nome Oficial da Unidade Escolar <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={schoolForm.name}
                  onChange={(e) => setSchoolForm({ ...schoolForm, name: e.target.value })}
                  placeholder="Ex: Centro de Excelência Gov. Augusto Franco"
                  required
                />
              </div>

              <div className="form-group col-7">
                <label className="form-label">Diretoria Regional (DRE / SEDUC-SE)</label>
                <select
                  className="form-control"
                  value={schoolForm.dre}
                  onChange={(e) => setSchoolForm({ ...schoolForm, dre: e.target.value })}
                >
                  <option value="DEA - Diretoria de Educação de Aracaju">
                    DEA - Diretoria de Educação de Aracaju
                  </option>
                  <option value="DRE 01 - Sul Sergipano (Estância)">
                    DRE 01 - Sul Sergipano (Estância)
                  </option>
                  <option value="DRE 02 - Centro-Sul (Lagarto)">
                    DRE 02 - Centro-Sul (Lagarto)
                  </option>
                  <option value="DRE 03 - Agreste Central (Itabaiana)">
                    DRE 03 - Agreste Central (Itabaiana)
                  </option>
                  <option value="DRE 06 - Baixo São Francisco (Propriá)">
                    DRE 06 - Baixo São Francisco (Propriá)
                  </option>
                  <option value="DRE 08 - Grande Aracaju (N. Sra. do Socorro)">
                    DRE 08 - Grande Aracaju (N. Sra. do Socorro)
                  </option>
                  <option value="DRE 09 - Alto Sertão (N. Sra. da Glória)">
                    DRE 09 - Alto Sertão (N. Sra. da Glória)
                  </option>
                </select>
              </div>

              <div className="form-group col-5">
                <label className="form-label">Município Sergipano</label>
                <input
                  type="text"
                  className="form-control"
                  value={schoolForm.city}
                  onChange={(e) => setSchoolForm({ ...schoolForm, city: e.target.value })}
                  placeholder="Ex: Lagarto / SE"
                  required
                />
              </div>

              <div className="form-group col-6">
                <label className="form-label">Modalidade Autorizada</label>
                <select
                  className="form-control"
                  value={schoolForm.modality}
                  onChange={(e) => setSchoolForm({ ...schoolForm, modality: e.target.value })}
                >
                  <option value="Ensino Médio em Tempo Integral e Profissional">
                    Ensino Médio Integral e Profissional
                  </option>
                  <option value="Ensino Médio em Tempo Integral">
                    Ensino Médio em Tempo Integral
                  </option>
                  <option value="Ensino Médio Regular e EJA">
                    Ensino Médio Regular e EJA
                  </option>
                </select>
              </div>

              <div className="form-group col-6">
                <label className="form-label">Portaria de Criação / Credenciamento</label>
                <select
                  className="form-control"
                  value={schoolForm.OrdinanceRef}
                  onChange={(e) => setSchoolForm({ ...schoolForm, OrdinanceRef: e.target.value })}
                >
                  {ordinances.map((ord) => (
                    <option key={ord.id} value={ord.number}>
                      {ord.number}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-gold" style={{ width: '100%' }}>
                  <School size={17} />
                  Credenciar Nova Escola na Rede SEDUC-SE
                </button>
              </div>
            </form>

            {/* Tabela de Escolas Credenciadas */}
            <div style={{ marginTop: '1.25rem' }}>
              <div
                style={{
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--seduc-text-secondary)',
                  marginBottom: '0.6rem',
                }}
              >
                Unidades Escolares Autorizadas ({schools.length})
              </div>
              <div className="table-responsive">
                <table className="seduc-table">
                  <thead>
                    <tr>
                      <th>INEP / Escola</th>
                      <th>Regional (DRE)</th>
                      <th>Portaria DIES</th>
                      <th>Matrizes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schools.map((sch) => (
                      <tr key={sch.id}>
                        <td>
                          <div style={{ fontWeight: 700 }}>{sch.name}</div>
                          <div style={{ fontSize: '0.74rem', color: 'var(--seduc-text-muted)' }}>
                            INEP: {sch.inep} • <MapPin size={11} style={{ display: 'inline' }} />{' '}
                            {sch.city}
                          </div>
                        </td>
                        <td style={{ fontSize: '0.78rem' }}>{sch.dre}</td>
                        <td>
                          <span className="badge badge-blue">{sch.OrdinanceRef}</span>
                        </td>
                        <td>
                          <span className="badge badge-green">
                            {sch.implementedMatrices.length} ativa(s)
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
