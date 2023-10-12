import * as express from 'express';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as http from 'http';
import * as path from 'path';
import * as referrerPolicy from 'referrer-policy';
import * as cookieParser from 'cookie-parser';
import swaggerDocs from './swagger';

import createMainRouter from './src/routes';
import { AccessControl, ErrorHandler } from './src/utils/middleware';
import { Logger, HttpLogger } from './src/utils/logger';
import { DbContext } from './config';
import SessionsRoute from './src/routes/session';

dotenv.config();

const PORT = process.env.PORT || 8080;

class App {
  public app: express.Express;
  public router: Record<any, any>;
  public db: Record<any, any>;
  public server: http.Server;
  public io: any;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(referrerPolicy());
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, './public')));
    this.app.use(express.static(path.join(__dirname, '../client/build')));
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'ejs');

    this.config();
    if (process.env.NODE_ENV === "development") swaggerDocs(this.app, Number(PORT));
    this.app.use('/api/v1/', createMainRouter());
    this.app.use('/sessions', new SessionsRoute().route());
    this.server = http.createServer(this.app);
    (async () => {
      try {
        await this.Database();
        this.app.listen(PORT, () => Logger.info(`Server running on port ${PORT}`));
        const io = require('socket.io')(this.server, {
          cors: {
            origin: '*',
          },
        });

        io.on('connection', (socket) => {
          socket.on('message', (msg) => {
            Logger.info('message: ' + msg);
          });

          socket.on('session-join', (o) => {
            socket.join(o['vhcsid']);
            io.to(o['vhcsid']).emit('session-join-message', o.msg);
          });
        });
      } catch (error) {
        Logger.error(`Error connecting to the database:  ${error.message}`);
      }
    })();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(AccessControl);
    this.app.use(ErrorHandler);
    this.app.use(HttpLogger);
  }

  private async Database() {
    if (process.env.NODE_ENV === "production") return Logger.info(`Successfully avoided database initialization`);
    this.db = new DbContext();
    await this.db.connect();
  }
}
const appInstance = new App();
const db = appInstance.db;
const app = appInstance.app;

export default { app, db };
