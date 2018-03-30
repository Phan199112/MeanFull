export class YourCommunitiesModel {
    title: string;
    id: string; // hashed db _id
    link: string; // link to form
    pic: string;
    constructor(private object: Object, y) {
        // general data
        this.title = object.title;
        this.id = object.id;
        this.pic = object.pic;
        this.link = y;
    }
}