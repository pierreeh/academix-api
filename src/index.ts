import 'dotenv/config';
import pino from 'pino';

import server from './server';

const logger = pino({ name: 'server start' });

function app() {
  try {
    const app = server();
    app.listen(process.env.PORT, () =>
      logger.info(`Listening on port ${process.env.PORT}`),
    );
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

app();
