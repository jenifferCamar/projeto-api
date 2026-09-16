const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const TIME_ZONE = 'America/Sao_Paulo';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function getDateTime() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    timeZone: TIME_ZONE,
    dateStyle: 'full',
    timeStyle: 'medium'
  });

  return {
    dataHora: formatter.format(now),
    data: new Intl.DateTimeFormat('pt-BR', {
      timeZone: TIME_ZONE,
      dateStyle: 'full'
    }).format(now),
    hora: new Intl.DateTimeFormat('pt-BR', {
      timeZone: TIME_ZONE,
      timeStyle: 'medium'
    }).format(now),
    fusoHorario: TIME_ZONE,
    timestamp: now.toISOString()
  };
}

app.get('/api/data-hora', (_req, res) => {
  res.json({
    sucesso: true,
    mensagem: 'Data e hora consultadas com sucesso.',
    ...getDateTime()
  });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor executando em http://localhost:${PORT}`);
});
