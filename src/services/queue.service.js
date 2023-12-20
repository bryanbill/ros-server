import Bull from 'bull'
import { config } from '../config/index.js'
import { NotificationService } from './index.js'

export class QueueService {
    static bull = new Bull('notification', {
        url: config.Redis.host,
        port: config.Redis.port
    });
    static async init() {
        this.bull.process(async (job, done) => {
            try {
                const { type, data } = job.data;
                switch (type) {
                    case "email":
                        await NotificationService.sendEmail(data);
                        break;
                    default:
                        break;
                }
                done();
            } catch (error) {
                done(error);
            }
        });
    }
    /**
     * @param {string} type
     * @param {object} data
     */
    static queue(type, data) {
        this.bull.add({ type, data })
    }
}