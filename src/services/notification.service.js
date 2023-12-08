export class NotificationService {
    constructor() {
    }
    static async send({ message, userId }) {
        console.log(`Sending ${message} to user`, userId);
    }

    async getAll() {
        return [];
    }
    handle(props) {
        const { message, userId } = props;
        this.sendMail({ message, userId });
    }
}
