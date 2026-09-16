const assert = require('assert');
const http = require('http');
const { spawn } = require('child_process');

const port = 3100;
const server = spawn(process.execPath, ['server.js'], {
  env: { ...process.env, PORT: String(port) },
  stdio: 'ignore'
});

function request(route) {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://localhost:${port}${route}`, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }));
    });
    req.on('error', reject);
  });
}

async function waitForServer() {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    try {
      await request('/health');
      return;
    } catch (_error) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  throw new Error('O servidor nao iniciou a tempo.');
}

async function run() {
  try {
    await waitForServer();
    const health = await request('/health');
    const api = await request('/api/data-hora');
    const page = await request('/');
    const css = await request('/styles.css');
    const javascript = await request('/app.js');

    assert.strictEqual(health.status, 200);
    assert.strictEqual(JSON.parse(health.body).status, 'ok');
    assert.strictEqual(api.status, 200);
    assert.strictEqual(JSON.parse(api.body).sucesso, true);
    assert.strictEqual(page.status, 200);
    assert.match(page.body, /styles\.css/);
    assert.match(page.body, /app\.js/);
    assert.match(page.body, /id="api-link"/);
    assert.strictEqual(css.status, 200);
    assert.match(css.headers['content-type'], /text\/css/);
    assert.match(css.body, /--teal/);
    assert.strictEqual(javascript.status, 200);
    assert.match(javascript.headers['content-type'], /javascript/);
    assert.match(javascript.body, /api\/data-hora/);
    console.log('Smoke test aprovado: API, frontend e assets respondem corretamente.');
  } finally {
    server.kill();
  }
}

run().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
