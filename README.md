# 📊 OtPokémon Analytics

> Uma ferramenta de inteligência de dados para otimizar o lucro e a eficiência no jogo **otPokémon**.

O **OtPokémon Analytics** é uma aplicação backend que coleta dados da Wiki, cruza com o histórico de capturas do jogador e utiliza matemática financeira (ROI) para sugerir a melhor estratégia de caça.

## 🚀 Funcionalidades Implementadas (Status Atual)

### 🕷️ Módulo Catálogo (Scrapers)

O sistema é capaz de ler a Wiki oficial e manter o banco de dados atualizado automaticamente.

- [x] **Sync Mall (Sammy):** Varre a página do NPC Sammy, detecta automaticamente a tabela de **Compra** e importa todas as Pokébolas (Poke, Great, Ultra, Premier) e seus preços.
- [x] **Sync Pokémons (Sam):** Varre a página do NPC Sam, identifica tabelas complexas (colunas múltiplas) e importa o preço de venda (Loot) de todos os Pokémons.
- [x] **Normalização de Dados:** Gera *slugs* únicos (`ultra_ball`, `charizard`) para garantir consistência entre Wiki e Banco de Dados.

### 📈 Módulo Analytics (Registro)

Permite que o usuário registre suas sessões de caça para alimentar a inteligência do sistema.

- [x] **Registro Unitário:** Rota para salvar uma tentativa de captura isolada.
- [x] **Registro em Lote (Bulk):** Rota otimizada para enviar centenas de tentativas de uma vez (ex: histórico do dia).
- [x] **Upsert Inteligente:** Se o registro já existe, o sistema atualiza os novos dados aos antigos, mantendo um histórico vitalício consolidado.

### 🧠 Módulo Intelligence (O Cérebro)

O diferencial do projeto. Analisa os dados e diz onde está o dinheiro.

- [x] **Cálculo de Taxa Real:** Estima a taxa de captura base (x1) de um Pokémon com base no histórico do usuário.
- [x] **Calculadora de ROI:** Mostra o **Retorno sobre Investimento**. (Ex: "A Ultra Ball captura mais, mas dá prejuízo de $50k. Use Great Ball para ROI de 300%").
- [x] **Métrica "Profit per Throw":** Ordena as sugestões não só pelo lucro unitário, mas pelo **Lucro por Tempo** (Eficiência de Farm).

## 🛠️ Stack Tecnológica

O projeto foi construído utilizando as melhores práticas de **Clean Architecture**, **DDD (Domain-Driven Design)** e princípios **SOLID**.

- **Linguagem:** TypeScript / Node.js
- **Framework:** Fastify (Alta performance)
- **Banco de Dados:** PostgreSQL
- **ORM:** TypeORM (Com Migrations e Entities tipadas)
- **Injeção de Dependência:** Awilix (Container IoC)
- **Scraping:** Cheerio + Axios
- **Validação:** TypeBox (Schema Validation & Serialization)

## 🗺️ Próximos Passos

Funcionalidades planejadas para as próximas versões.

### 🔐 1. Módulo de Autenticação & Segurança

- [ ] **Modelagem:** Criar tabela `users` (id, email, password_hash).
- [ ] **Login:** Implementar autenticação JWT.
- [ ] **Isolamento:** Garantir que os dados de `catch_attempts` sejam segregados por usuário (cada um tem sua estatística).

### 🕷️ 2. Expansão do Web Scraping

- [ ] **Patch Notes:** Monitorar nerfs e buffs na Wiki.
- [ ] **Quests:** Listar requisitos e recompensas de Quests.
- [ ] **NPCs:** Mapear localização e funções de todos os NPCs.

### 🤖 3. Inteligência Artificial (LangChain)

- [ ] **RAG (Retrieval Augmented Generation):** Conectar o banco de dados Postgres ao LangChain.
- [ ] **Chatbot:** Permitir perguntas em linguagem natural: *"Qual a melhor bola para caçar Snorlax se eu tenho pouco dinheiro?"*.

## 📦 Como Testar o Projeto

### Pré-requisitos

* Node.js (v18+)
* Docker (para o banco de dados) ou uma instância Postgres local

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/MTHSKM/otpokemon.git
   ```
   
2. Instale as dependências:
   ```bash
   npm install
   ```
      
3. Configure o ambiente: Crie um arquivo .env na raiz (copie do .env.example) e configure as variáveis de ambiente.
   
4. Crie o Schema (Manualmente) e as Tabelas:
   ```bash
   CREATE SCHEMA IF NOT EXISTS otpokemon;
   ```
   
   ```bash
   npm run typeorm migration:run
   ```
      
5. Inicie o servidor:
   ```bash
   npm run dev
   ```