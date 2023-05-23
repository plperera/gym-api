import * as fs from 'fs';
import * as https from 'https';
import app, { init } from "./app";

const port = +process.env.PORT || 5000;

const privateKey = fs.readFileSync('/etc/letsencrypt/live/www.upsportbrasil.com.br/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/www.upsportbrasil.com.br/fullchain.pem', 'utf8');

const credentials: https.ServerOptions = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials, app);

init().then(() => {
  app.listen(port, () => {
    /* eslint-disable-next-line no-console */
    console.log(`Estou de olho na porta: ${port}!!!`);
  });
});
