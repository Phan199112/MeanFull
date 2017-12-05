export class DiscussionModel {
    id: string;
    author: string;
    message: string;
    timestamp: string;
    admin: string;

    constructor(private object: Object) {
        // general data
        this.id = object.id;
        this.author = object.author;
        this.message = object.message;
        this.timestamp = object.timestamp;
        this.admin = object.admin;
    }
}