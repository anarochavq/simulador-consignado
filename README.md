# simulador-consignado
Simulador de empréstimo consignado com integração a APIs bancárias fictícias.

Aplicação web desenvolvida como parte de um desafio técnico para estágio em desenvolvimento. O sistema permite simular um empréstimo consignado e consultar os resultados de avaliação de diferentes bancos simulados.

## Funcionalidades

- Formulário para informar os dados do empréstimo.
- Envio dos dados para o backend.
- Consulta a diferentes bancos simulados.
- Tratamento de respostas e possíveis falhas nas consultas.
- Exibição dos resultados da simulação.
- Execução da aplicação com Docker Compose.

## Tecnologias utilizadas

**Frontend**
- React
- TypeScript
- Vite

**Backend**
- Node.js
- TypeScript
- Express

**Ferramentas**
- Docker
- Docker Compose
- Git e GitHub

## Como executar o projeto

### Pré-requisitos

- Git
- Docker Desktop instalado e em execução

### 1. Clonar o repositório

```bash
git clone https://github.com/anarochavq/simulador-consignado.git
```

### 2. Entrar na pasta do projeto

```bash
cd simulador-consignado
```

### 3. Executar a aplicação

```bash
docker compose up --build
```

Após a inicialização, acesse o endereço local indicado no terminal.

Para parar a aplicação, pressione `Ctrl + C` e execute:

```bash
docker compose down
```

## Observações

Os bancos utilizados na aplicação são simulados, com o objetivo de demonstrar a integração com serviços externos, o tratamento de respostas e o gerenciamento de possíveis falhas.

O projeto foi desenvolvido com foco na prática de conceitos de desenvolvimento web, integração entre frontend e backend e conteinerização com Docker.

## Autora

**Ana Beatriz Oliveira Vanderlei**

