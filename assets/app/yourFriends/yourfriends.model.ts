export class YourFriendsModel {
    name: string;
    id: string; // hashed db _id
    link: string;

    constructor(private object: Object, y) {
        // general data
        this.name = object.name;
        this.id = object.id;
        this.link = y;
    }
}