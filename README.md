# Simulador de Empréstimo Consignado

Simulador de empréstimo consignado com integração a APIs bancárias fictícias, desenvolvido como parte de um desafio técnico para estágio em desenvolvimento.

A aplicação permite que o usuário informe seus dados, solicite uma simulação e consulte os resultados da avaliação de diferentes instituições financeiras simuladas.

## Funcionalidades

- Formulário para preenchimento dos dados do empréstimo.
- Envio dos dados do frontend para o backend.
- Consulta a diferentes bancos simulados.
- Processamento e consolidação das respostas bancárias.
- Exibição individual dos resultados de cada instituição financeira.
- Tratamento de respostas e possíveis falhas nas consultas.
- Execução da aplicação com Docker Compose.

## Tecnologias utilizadas

### Frontend

- React: construção da interface.
- TypeScript: tipagem estática e organização do código.
- Vite: ambiente de desenvolvimento e ferramenta de build.

### Backend

- Node.js: ambiente de execução do JavaScript.
- TypeScript: tipagem estática e organização da lógica.
- Express: criação das rotas e processamento das requisições HTTP.

### Ferramentas

- Docker: conteinerização da aplicação.
- Docker Compose: configuração e execução dos serviços.
- Git e GitHub: versionamento e hospedagem do código.

## Como executar o projeto

### Pré-requisitos

- Git instalado.
- Docker Desktop instalado e em execução.

### 1. Clonar o repositório

```bash
git clone https://github.com/anarochavq/simulador-consignado.git
```

### 2. Entrar na pasta do projeto

```bash
cd simulador-consignado
```

### 3. Iniciar a aplicação

```bash
docker compose up --build
```

Aguarde a construção das imagens e a inicialização dos serviços.

Após a inicialização, acesse o endereço local configurado para o frontend.

### 4. Encerrar a aplicação

Pressione `Ctrl + C` no terminal e execute:

```bash
docker compose down
```

## Decisões técnicas

### Separação entre frontend e backend

A aplicação foi organizada em frontend e backend para separar a interface do usuário das regras de processamento e integração com os bancos simulados.

Essa divisão facilita a manutenção, os testes e a evolução independente das partes do sistema.

### Utilização de TypeScript

O TypeScript foi utilizado para adicionar tipagem estática ao código, facilitando a identificação de inconsistências e tornando as estruturas de dados mais claras.

### Simulação de serviços bancários

Foram utilizados bancos fictícios para representar chamadas a serviços externos sem depender de APIs bancárias reais.

Essa abordagem permite demonstrar o processamento de respostas, a consolidação dos resultados e o tratamento de falhas em um ambiente controlado.

### Utilização do Docker Compose

O Docker Compose foi escolhido para facilitar a inicialização dos serviços e tornar a execução do projeto mais consistente em diferentes ambientes.

## Limitações

- Os bancos utilizados são fictícios e não realizam consultas a instituições financeiras reais.
- As regras de aprovação e reprovação são simuladas e não representam uma análise real de crédito.
- A aplicação não realiza contratação de empréstimos.
- O projeto foi desenvolvido como um MVP para demonstrar conceitos de desenvolvimento web, integração entre serviços e tratamento de respostas.
- A aplicação não substitui os processos de validação, segurança e conformidade necessários para um serviço financeiro em produção.

## Melhorias e proposições

As melhorias estão divididas entre funcionalidades implementadas e propostas planejadas. As propostas planejadas estão organizadas por ordem de prioridade.

### Melhorias implementadas

#### 1. Consulta a diferentes bancos simulados

**Problema:** consultar apenas uma instituição financeira limitaria a visualização das alternativas disponíveis para o cliente.

**Proposta:** implementar consultas a diferentes bancos simulados e apresentar os resultados individualmente.

**Por quê:** permite visualizar e comparar as respostas das instituições em uma única interface, facilitando a compreensão do resultado da simulação.

#### 2. Tratamento de respostas e falhas

**Problema:** serviços externos podem apresentar erros ou ficar indisponíveis durante uma consulta.

**Proposta:** implementar tratamento para respostas e possíveis falhas nas consultas aos bancos simulados.

**Por quê:** melhora a comunicação dos resultados e ajuda a distinguir problemas de disponibilidade de uma decisão de aprovação ou reprovação.

### Melhorias planejadas

As propostas a seguir representam evoluções futuras do projeto e não devem ser consideradas funcionalidades implementadas.

#### 1. Validação e qualidade dos dados

**Problema:** dados incorretos ou incompletos podem comprometer o processamento de uma simulação.

**Proposta:** ampliar as validações de CPF, CNPJ, e-mail, salário e valor solicitado, tanto no frontend quanto no backend.

**Por quê:** reduz erros de entrada, melhora a qualidade dos dados processados e torna o uso da aplicação mais confiável.

#### 2. Controle de tempo das consultas bancárias

**Problema:** um serviço externo pode demorar para responder, prejudicando o tempo de espera do cliente.

**Proposta:** implementar um tempo limite para cada consulta e garantir que a falha de uma instituição não impeça a apresentação dos resultados das demais.

**Por quê:** melhora a experiência do usuário e aumenta a resiliência do serviço diante de falhas externas.

#### 3. Reforço da segurança dos dados

**Problema:** dados pessoais e financeiros precisam ser protegidos contra exposição indevida.

**Proposta:** revisar o armazenamento e os registros da aplicação, evitar a exposição de informações sensíveis e reforçar as validações e os controles de segurança.

**Por quê:** reduz riscos relacionados ao tratamento de dados pessoais e prepara a aplicação para uma evolução mais segura.

#### 4. Testes automatizados

**Problema:** alterações no código podem introduzir erros no processamento das solicitações ou na interpretação das respostas bancárias.

**Proposta:** implementar testes automatizados para as regras de negócio, as rotas do backend e os cenários de falha dos bancos simulados.

**Por quê:** facilita a identificação de regressões, aumenta a confiança nas alterações e melhora a qualidade da aplicação.

#### 5. Monitoramento e registro de falhas

**Problema:** em um ambiente de produção, falhas nas integrações podem dificultar a identificação da causa de problemas.

**Proposta:** implementar registros estruturados de erros e mecanismos de monitoramento das consultas aos serviços externos, sem registrar dados pessoais desnecessários.

**Por quê:** facilita o diagnóstico de falhas e contribui para a manutenção e a confiabilidade do serviço.

## Considerações finais

O projeto demonstra uma solução inicial para simulação de empréstimos consignados, com separação entre frontend e backend, integração com bancos fictícios e execução conteinerizada.

As melhorias planejadas priorizam a qualidade dos dados, a resiliência das integrações, a segurança, os testes e o monitoramento, considerando a experiência do cliente e as necessidades de manutenção da operação.

## Autora

**Ana Beatriz Oliveira Vanderlei**
