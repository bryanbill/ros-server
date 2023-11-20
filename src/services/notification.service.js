export class NotificationService {
    constructor() {
        console.log("Notification Service Constructor");
    }

    send(to, body) {
        console.log("Sending Notification");
    }

    async getAll() {
        return [];
    }
}