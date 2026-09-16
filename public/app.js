const refreshButton = document.querySelector('#refresh-button');
const timeDisplay = document.querySelector('#time-display');
const dateDisplay = document.querySelector('#date-display');
const timezoneDisplay = document.querySelector('#timezone');
const lastUpdate = document.querySelector('#last-update');
const connectionStatus = document.querySelector('#connection-status');

function setLoading(isLoading) {
  refreshButton.disabled = isLoading;
  refreshButton.classList.toggle('is-loading', isLoading);
  refreshButton.innerHTML = isLoading
    ? '<span class="button-icon">↻</span> Consultando...'
    : '<span class="button-icon">↻</span> Consultar agora';
}

function formatUpdateTime() {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(new Date());
}

async function loadDateTime() {
  setLoading(true);
  connectionStatus.textContent = 'Consultando a API...';

  try {
    const response = await fetch('/api/data-hora', {
      cache: 'no-store',
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) throw new Error('A API retornou um erro.');

    const data = await response.json();
    timeDisplay.textContent = data.hora;
    dateDisplay.textContent = data.data;
    timezoneDisplay.textContent = data.fusoHorario;
    lastUpdate.textContent = `Última consulta às ${formatUpdateTime()}`;
    connectionStatus.textContent = 'Conexão estabelecida';
    connectionStatus.classList.add('is-connected');
  } catch (error) {
    timeDisplay.textContent = 'Indisponível';
    dateDisplay.textContent = 'Não foi possível consultar a API agora.';
    timezoneDisplay.textContent = '--';
    lastUpdate.textContent = 'Tente novamente em alguns instantes';
    connectionStatus.textContent = 'Falha na conexão';
    connectionStatus.classList.remove('is-connected');
    console.error(error);
  } finally {
    setLoading(false);
  }
}

refreshButton.addEventListener('click', loadDateTime);
loadDateTime();
setInterval(loadDateTime, 60_000);
