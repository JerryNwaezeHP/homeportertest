import * as express from 'express'
import * as dotenv from 'dotenv'
import * as cors from 'cors'
import * as http from 'http'

import createMainRouter from './src/routes'; 
import { AccessControl, ErrorHandler } from './src/utils/middleware'
import { DbContext } from './config'

dotenv.config()

const PORT = process.env.PORT || 8080

class App {
  public app: express.Application
  public router: Record<any, any>
  public db: Record<any, any>
  public server: http.Server;
  public io: any;

  constructor() {
    this.app = express()
    this.app.use(cors())
    this.config()
    this.router = express.Router()
    this.router.use(
      '/api/v1/',
      createMainRouter()
    )
    this.server = http.createServer(this.app);

    (async () => {
      try {
        await this.Database()
        this.app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
        const io = require('socket.io')(this.server, {
          cors: {
            origin: '*',
          },
        });
      
        io.on('connection', (socket) => {
          socket.on('message', (msg) => {
            console.log('message: ' + msg);
          });
      
          socket.on('session-join', (o) => {
            socket.join(o['vhcsid']);
            io.to(o['vhcsid']).emit('session-join-message', o.msg);
          });
        });
      } catch (error) {
        console.error(`Error connecting to the database:  ${error.message}`)
      }
    })()
  }

  private config(): void {
    this.app.use(express.json({ limit: '20mb' }))
    this.app.use(express.urlencoded({ limit: '20mb', extended: true }))
    this.app.use(AccessControl)
    this.app.use(ErrorHandler)
  }

  private async Database() {
    this.db = new DbContext()
    await this.db.connect()
  }
}
const appInstance = new App()
const db = appInstance.db
const app = appInstance.app
export default { app, db }
