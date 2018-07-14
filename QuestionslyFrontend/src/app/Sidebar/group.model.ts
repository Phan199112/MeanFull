export class GroupModel {
  title: string;
  id: string; // hashed db _id
  pic: string;

  constructor(private object: any) {
      // general data
      this.title = object.title;
      this.id = object.id; // encrypted
      this.pic = object.pic;
  }
}
