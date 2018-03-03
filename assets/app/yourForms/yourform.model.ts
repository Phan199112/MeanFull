export class YourFormModel {
    title: string;
    id: string; // hashed db _id
    draft: string = '';

    constructor(private object: Object) {
        // general data
        this.title = object.title;
        this.id = object.id;
        if (object.shared == false) {
            this.draft = '(Draft)';
        }
    }
}