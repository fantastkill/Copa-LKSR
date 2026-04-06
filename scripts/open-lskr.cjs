const { spawn } = require('node:child_process');
const net = require('node:net');

const WEB_PORT = 5174;
const PB_PORT = 8090;
const WEB_URL = `http://127.0.0.1:${WEB_PORT}/`;

function isPortListening(port) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(1200);

    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });

    socket.on('error', () => resolve(false));
    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });

    socket.connect(port, '127.0.0.1');
  });
}

function startDetached(commandText) {
  const isWindows = process.platform === 'win32';
  const launcher = isWindows ? 'cmd.exe' : 'sh';
  const launcherArgs = isWindows ? ['/d', '/s', '/c', commandText] : ['-lc', commandText];

  const child = spawn(launcher, launcherArgs, {
    cwd: process.cwd(),
    detached: true,
    stdio: 'ignore',
    windowsHide: true
  });
  child.unref();
}

async function waitForWeb(timeoutMs = 120000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    const ok = await isPortListening(WEB_PORT);
    if (ok) return true;
    await new Promise((r) => setTimeout(r, 1200));
  }
  return false;
}

function openInBrowser(url) {
  const commands = [
    ['cmd', ['/c', 'start', '', url]],
    ['powershell', ['-NoProfile', '-Command', `Start-Process '${url}'`]],
    ['explorer.exe', [url]],
    ['rundll32', ['url.dll,FileProtocolHandler', url]]
  ];

  for (const [cmd, args] of commands) {
    try {
      const child = spawn(cmd, args, {
        cwd: process.cwd(),
        stdio: 'ignore',
        shell: false,
        windowsHide: true,
        detached: true
      });
      child.unref();
      return true;
    } catch {
      // try next strategy
    }
  }

  return false;
}

async function main() {
  const webOnline = await isPortListening(WEB_PORT);
  if (!webOnline) {
    console.log('Iniciando frontend LSKR na porta 5174...');
    startDetached('npm run dev --prefix apps/web');
  }

  const pbOnline = await isPortListening(PB_PORT);
  if (!pbOnline) {
    console.log('Iniciando PocketBase na porta 8090...');
    startDetached('npm run dev --prefix apps/pocketbase');
  }

  const ready = await waitForWeb();
  if (!ready) {
    console.error(`Nao consegui subir o LSKR em ${WEB_URL} dentro do tempo limite.`);
    process.exit(1);
  }

  const opened = openInBrowser(WEB_URL);
  if (opened) {
    console.log(`LSKR aberto em ${WEB_URL}`);
  } else {
    console.log(`LSKR pronto em ${WEB_URL}. Abra esse link manualmente no navegador.`);
  }
}

main().catch((err) => {
  console.error('Falha ao abrir o LSKR:', err.message);
  process.exit(1);
});
