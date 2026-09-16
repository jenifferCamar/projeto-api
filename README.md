# Atividade 02 - API de data e hora

Aplicação criada com Express e um frontend que consome a rota de data e hora.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https%3A%2F%2Fgithub.com%2FjenifferCamar%2Fprojeto-api)

## Executar localmente

```bash
npm install
npm start
```

Depois, abra `http://localhost:3000`.

O CSS e o JavaScript sao carregados como arquivos estaticos relativos a pagina. Assim, o frontend funciona tanto na raiz publicada pelo Express quanto quando a pagina e revisada dentro da pasta `public`.

Se usar a extensao Live Server no VS Code, mantenha o Express rodando com `npm start`. A interface identifica a porta `5501` e consulta automaticamente a API em `http://localhost:3000`.

## Rotas

- `GET /api/data-hora`: retorna a data, hora, fuso horário e timestamp em JSON.
- `GET /health`: rota usada pelo Render para verificar a saúde do serviço.

## Deploy no Render

1. Clique no botão **Deploy to Render** acima e entre na sua conta Render.
2. Autorize a conexão com o repositório `jenifferCamar/projeto-api` e confirme a criação do Blueprint.
3. O arquivo `render.yaml` aplicará `npm ci`, `npm start` e o health check `/health` automaticamente.
4. Após o deploy, a interface ficará disponível na URL gerada pelo Render; a API estará em `/api/data-hora`.

### Verificação pós-deploy

Use estas URLs para conferir o serviço:

- `https://SEU-SERVICO.onrender.com/` para a interface.
- `https://SEU-SERVICO.onrender.com/api/data-hora` para o JSON da API.
- `https://SEU-SERVICO.onrender.com/health` para o health check.
