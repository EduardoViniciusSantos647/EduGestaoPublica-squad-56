# 🏛️ SIGA-SEDUC | Sistema Integrado de Gestão Acadêmica, DIES e Diário Eletrônico (SEED Sergipe)

Bem-vindo(a) ao repositório do **SIGA-SEDUC Sergipe**! Este sistema foi projetado com arquitetura limpa em **React JS** e identidade visual inspirada diretamente no portal oficial da **Secretaria de Estado da Educação e da Cultura de Sergipe — SEDUC/SEED** ([https://seduc.se.gov.br/](https://seduc.se.gov.br/)).

> Este código-fonte foi escrito de forma intencionalmente didática, organizada e comentada para que você consiga **ler, entender, dar manutenção e evoluir** uma aplicação React do mundo real sem complicações desnecessárias.

---

## 🎨 Padrão Cromático Oficial (SEDUC / Governo de Sergipe)

As cores utilizadas em `src/styles/seduc-theme.css` foram extraídas da folha de estilos global do portal da SEDUC Sergipe:

| Variável CSS | Cor Hexadecimal | Aplicação no Sistema |
| :--- | :--- | :--- |
| `--seduc-blue-primary` | `#164194` | Azul Institucional Primário (Cabeçalho, botões principais, destaques) |
| `--seduc-blue-dark` | `#1B3D74` / `#01448A` | Azul Marinho Governamental (Barra superior Gov.SE e gradientes) |
| `--seduc-gold` | `#FFB900` | Amarelo Ouro Sergipe (Selos normativos, alertas de carga ociosa e destaques) |
| `--seduc-green` | `#2AC034` | Verde Esmeralda Sergipe (Status autorizado/deferido, presença e metas cumpridas) |
| `--seduc-gray-secondary`| `#54595F` | Textos secundários, subtítulos e legendas técnicas |

---

## 👥 Os 3 Perfis de Usuário e Fluxo Integrado

O sistema possui um **Seletor Rápido de Perfil** no cabeçalho superior que permite alternar instantaneamente entre os três atores do ecossistema escolar. Todos compartilham o mesmo estado global (`AcademicContext`), ou seja, o que você faz em um perfil reflete imediatamente nos outros!

### 1. 🏛️ ADM — DIES (Diretoria de Inspeção Escolar / Normatização)
* **Portarias e Escolas (`DiesDashboard.jsx`):** Publica Portarias DIES/SEDUC e credencia novas Unidades Escolares (com código INEP, DRE e município sergipano).
* **Cursos e Disciplinas (`CoursesManager.jsx`):** Mantém o catálogo de cursos (Técnico Integrado, Ensino Médio Integral, Regular) e disciplinas (código, eixo BNCC/Técnico e carga horária semanal/anual).
* **Matrizes Curriculares (`MatricesManager.jsx`):** Monta a grade curricular de cada curso e emite a **Autorização/Homologação da DIES**.

### 2. 🏫 ADM — Gestão Acadêmica (Secretaria / Coordenação)
* **Implementação Escolar e Calendário (`SchoolImplementation.jsx`):** Recebe as escolas e matrizes autorizadas pela DIES, implementa as matrizes na escola e gerencia o Calendário Letivo (Unidades Bimestrais, feriados sergipanos e sábados letivos).
* **Criação de Turmas, Vagas e Horários (`ClassesManager.jsx`):** Cria turmas definindo turno, sala/laboratório, **limite máximo de vagas** e grade de horários semanal.
* **Distribuição de Professores e Orquestração de Carga Horária (`TeacherAllocation.jsx`):** Monitora a jornada contratual em regência de cada docente vs. horas alocadas, destacando visualmente quem está com **Carga Horária Ociosa** para que a coordenação aloque turmas e evite ociosidade.
* **Painel de Deferimento de Aulas Excepcionais (`ExceptionalClassesReview.jsx`):** Analisa os pedidos enviados pelos professores, registra o parecer pedagógico e decide pelo **Deferimento** ou **Indeferimento**.

### 3. 👨‍🏫 Professor (Diário Eletrônico)
* **Frequência Diária Ágil e Tópicos Ministrados (`AttendanceDiary.jsx`):** Chamada rápida com botões de 1 clique (`P` Presente, `F` Falta, `FJ` Falta Justificada), botão *"Marcar Todos Presentes"*, alerta automático de risco de reprovação por falta (`< 75%`) e registro de tópicos ministrados.
* **Lançamento de Notas das Avaliações (`GradesEntry.jsx`):** Planilha por Unidade Letiva (`AV1`, `AV2`, `Qualitativa` e `Recuperação Paralela`) com cálculo automático de média e situação do estudante.
* **Solicitação de Aulas Excepcionais (`ExceptionalClassRequest.jsx`):** Permite solicitar **Reposição de Aula** ou **Antecipação de Aula** e acompanhar em tempo real o status e o parecer da Gestão Acadêmica.

---

## 🚀 Como Rodar o Projeto na sua Máquina

Pré-requisito: ter o **Node.js** instalado (versão 18 ou superior).

```bash
# 1. Entre na pasta do projeto
cd EduGestaoPublica-squad-56

# 2. Instale as dependências (React, Lucide Icons e Vite)
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Depois, abra o navegador no endereço exibido no terminal (geralmente `http://localhost:5173`).

---

## 📂 Estrutura de Pastas 

```text
EduGestaoPublica-squad-56/
├── index.html                  # Página HTML raiz onde o React é montado (<div id="root">)
├── package.json                # Lista de bibliotecas e scripts do projeto
├── vite.config.js              # Configuração do empacotador Vite
└── src/
    ├── main.jsx                # Ponto de entrada que inicializa o React
    ├── App.jsx                 # Componente principal que junta Topo, Sidebar e Telas
    ├── styles/
    │   └── seduc-theme.css     # Variáveis de cores da SEDUC-SE e classes visuais
    ├── data/
    │   └── mockData.js         # Dados iniciais de escolas, portarias, alunos e professores
    ├── context/
    │   └── AcademicContext.jsx # "Cérebro" da aplicação: guarda estados e funções globais
    ├── components/
    │   ├── common/             # Componentes pequenos e reutilizáveis (StatCard, Toast)
    │   └── layout/             # Estrutura fixa da tela (GovTopBar, Header, Sidebar)
    └── pages/
        ├── dies/               # Telas do perfil ADM - DIES
        ├── gestao/             # Telas do perfil ADM - Gestão Acadêmica
        └── professor/          # Telas do perfil Professor (Diário Eletrônico)
```

---

## 🧠 Conceitos de React JS Aplicados

Observe como estes 5 pilares do React foram aplicados no código:

1. **Componentização e `Props` (`src/components/common/StatCard.jsx`):**
   Em vez de repetir o HTML de um cartão de estatística 15 vezes, criamos o componente `<StatCard label="..." value="..." />` que recebe dados via `props`.
2. **Estado Local com `useState` (Formulários Controlados):**
   Em todas as telas com formulários (como `ClassesManager.jsx`), usamos `const [classForm, setClassForm] = useState(...)`. Cada vez que o usuário digita em um `<input>`, o evento `onChange` atualiza o estado.
3. **Imutabilidade de Listas (`.map`, `.filter` e `...spread`):**
   No React, nunca alteramos um array diretamente com `.push()`. Veja em `AcademicContext.jsx` como adicionamos itens criando um novo array:
   ```js
   setCourses((prev) => [novoCurso, ...prev]); // Adiciona no início
   setCourses((prev) => prev.filter((c) => c.id !== courseId)); // Remove pelo ID
   ```
4. **Estado Derivado com `useMemo` (`teachersWithWorkload` em `AcademicContext.jsx`):**
   Para evitar que o professor fique ocioso, o sistema soma automaticamente as horas de todas as turmas alocadas para cada professor usando `useMemo`, recalculando o saldo ocioso toda vez que uma turma ou horário muda.
5. **Persistência com `useEffect` e `localStorage`:**
   Tudo o que você cadastra fica salvo no navegador. Se recarregar a página (`F5`), seus dados continuam lá! E se quiser voltar ao estado original, basta clicar no botão **"Restaurar Dados Demo"** na barra superior do Governo de Sergipe.

---

## 🛠️ Tarefas Sugeridas 


### 🟢 Nível 1 — Iniciante (Praticando JSX, Props e `useState`)
- [ ] **Tarefa 1.1 — Filtro de Escolas por DRE (`DiesDashboard.jsx`):**
  Crie um `<select>` acima da tabela de Unidades Escolares para filtrar as escolas exibidas por Diretoria Regional (ex: mostrar apenas escolas da `DEA` ou da `DRE 03`).
- [ ] **Tarefa 1.2 — Contador de Caracteres na Justificativa (`ExceptionalClassRequest.jsx`):**
  Adicione um contador abaixo do `<textarea>` de justificativa mostrando quantos caracteres o professor já digitou (ex: `120 / 300 caracteres`) e exiba um aviso caso tenha menos de 20 caracteres.
- [ ] **Tarefa 1.3 — Busca de Disciplinas por Nome ou Área (`CoursesManager.jsx`):**
  Adicione um campo de busca (`<input type="text">`) na listagem de disciplinas para filtrar em tempo real pelo nome ou código da disciplina.

### 🟡 Nível 2 — Intermediário (Praticando Validações e Regras de Negócio)
- [ ] **Tarefa 2.1 — Validação de Choque de Horário do Professor (`AcademicContext.jsx` e `TeacherAllocation.jsx`):**
  Antes de alocar um professor em uma turma (`allocateTeacherToSchedule`), verifique se esse mesmo professor já não está alocado em **outra turma no mesmo dia da semana e mesmo horário (`day` + `slot`)**. Se estiver, impeça a alocação e exiba um alerta com `showToast`!
- [ ] **Tarefa 2.2 — Bloqueio de Sobrecarga Docente (`TeacherAllocation.jsx`):**
  Impessa que a Gestão Acadêmica aloque uma nova disciplina para um professor caso a soma ultrapasse sua `contractedRegencyHours` (Carga Horária Contratada em Regência).
- [ ] **Tarefa 2.3 — Cadastro de Novos Alunos na Turma (`ClassesManager.jsx`):**
  Crie um pequeno formulário ou modal para matricular um novo estudante em uma turma existente, respeitando o limite máximo de vagas (`maxSeats`) definido para aquela turma!

### 🔴 Nível 3 — Avançado (Novas Funcionalidades e Componentização)
- [ ] **Tarefa 3.1 — Boletim Escolar Individual do Aluno (Novo Componente):**
  Na tela de Lançamento de Notas (`GradesEntry.jsx`), adicione um botão **"Ver Boletim Completo"** ao lado de cada aluno que abra um Modal exibindo as notas das 4 Unidades (`u1`, `u2`, `u3`, `u4`), a Média Anual Final e a frequência acumulada daquele estudante.
- [ ] **Tarefa 3.2 — Exportação de Relatório em CSV ou Impressão (`window.print`):**
  No painel de Análise de Aulas Excepcionais (`ExceptionalClassesReview.jsx`), crie um botão **"Imprimir Portaria / Despacho de Deferimento"** que gere uma visualização limpa para impressão dos pedidos deferidos.
- [ ] **Tarefa 3.3 — Migração de Rotas com `react-router-dom`:**
  Substitua a navegação baseada em estado (`activeTab`) por rotas reais de URL (ex: `/dies/matrizes`, `/gestao/alocacao`, `/professor/diario`) utilizando a biblioteca `react-router-dom`.

---

