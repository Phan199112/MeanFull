export class TagModel {
    tag: string;
    count = 0;

    constructor(private object: Object) {
        // general data
        this.tag = object.tag;
        this.count = object.count;
    }

}