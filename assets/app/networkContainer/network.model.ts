export class NetworkModel {
    name: Object;
    pic: [string];
    link: string;

    constructor(private object: Object) {
        // general data
        this.name = object.name;
        this.pic = object.pic;
        this.link = object.link;
    }

}