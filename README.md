# Atividade 02 - API de data e hora

Aplicação criada com Express e um frontend que consome a rota de data e hora.

## Executar localmente

```bash
npm install
npm start
```

Depois, abra `http://localhost:3000`.

O CSS e o JavaScript sao carregados como arquivos estaticos relativos a pagina. Assim, o frontend funciona tanto na raiz publicada pelo Express quanto quando a pagina e revisada dentro da pasta `public`.

## Rotas

- `GET /api/data-hora`: retorna a data, hora, fuso horário e timestamp em JSON.
- `GET /health`: rota usada pelo Render para verificar a saúde do serviço.

## Deploy no Render

1. Suba este projeto para um repositório no GitHub.
2. No Render, selecione **New > Web Service** e conecte o repositório.
3. Use `npm install` no campo **Build Command** e `npm start` no campo **Start Command**.
4. O arquivo `render.yaml` já deixa essa configuração registrada para o Blueprint.
5. Após o deploy, a interface ficará disponível na URL gerada pelo Render; a API estará em `/api/data-hora`.

### Verificação pós-deploy

Use estas URLs para conferir o serviço:

- `https://SEU-SERVICO.onrender.com/` para a interface.
- `https://SEU-SERVICO.onrender.com/api/data-hora` para o JSON da API.
- `https://SEU-SERVICO.onrender.com/health` para o health check.
