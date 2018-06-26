export class DiscussionModel {
    id: string;
    fb: string;
    author: any;
    message: string;
    timestamp: string;
    admin: string;

    constructor(private object: any) {
        // general data
        this.id = object.id;
        this.fb = object.fb;
        this.author = object.author;
        this.message = object.message;
        this.timestamp = object.timestamp;
        this.admin = object.admin;
    }
}
