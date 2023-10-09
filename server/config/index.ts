import { Sequelize } from 'sequelize-typescript';
import * as models from '../src/models';
import { Logger } from '../src/utils/logger';

export class DbContext {
    public _sequelize: Sequelize;

    constructor() {
        const LOGGING = process.env.NODE_ENV === "development";
        this._sequelize = new Sequelize(process.env.DB_URL as string, {
            models: Object.values(models),
            logging: LOGGING ? (s: string) => Logger.info(s) : false,
        });
    }

    public async connect(): Promise<void> {
        await this._sequelize.authenticate();
    }

    public async sync(): Promise<void> {
        await this._sequelize.sync({ force: true });
    }

    public getDB(): Sequelize {
        return this._sequelize;
    }
}