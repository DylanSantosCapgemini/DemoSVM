# Formulário SVM para criação de Lead

Projeto pronto para versionamento no Git e publicação como Web Service Node.js.

## Estrutura

- `index.html`: formulário responsivo.
- `server.js`: backend que obtém o token OAuth e chama a EAPI Customer.
- `package.json`: dependências e comando de inicialização.
- `render.yaml`: definição opcional de infraestrutura para o Render.
- `.env.example`: modelo das variáveis de ambiente.
- `.gitignore`: impede o versionamento de credenciais e dependências locais.

## Interesses disponíveis

- Newsletter - 8 minutos: `DN8MINUTOS`
- Newsletter - Diário de Sala: `DNDIARIOSALA`
- Newsletter - Reportagens Especiais: `DNREPORTAGENSESPECIAIS`
- SVM Insights - E-book: `SVMINSIGHTS_EBOOK`

O valor selecionado é enviado em `newsletterInterest` e também em `challengeWord`, mantendo ambos sincronizados.

## Publicação

1. Extraia o ZIP.
2. Crie um repositório Git privado e envie o conteúdo desta pasta para a raiz.
3. No Render, crie um Web Service usando o repositório, ou aplique o Blueprint definido em `render.yaml`.
4. Cadastre no provedor as variáveis `TOKEN_URL`, `LEADS_URL`, `CLIENT_ID` e `CLIENT_SECRET`.
5. Use credenciais novas. Não versione o arquivo `.env`.

## Execução local

Requer Node.js 18 ou superior.

```bash
npm install
npm start
```

O navegador chama apenas `/api/leads`. As credenciais OAuth permanecem no backend.
