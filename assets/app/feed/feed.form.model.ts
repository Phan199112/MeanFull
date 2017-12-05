
export class FeedForm {
    title: string;
    author: string;
    authorlink: string;
    authorlinkdisabled: boolean;
    authorgender: string;
    timestamp: string;
    id: string;
    description: string;
    questions: object;
    answered: boolean;
    plotdata: any;
    pic: string;
    pictype: string;
    contracted: boolean = true;
    viewGraphsbool: boolean;
    hashtags: string[];
    showdata: boolean;
    expired: boolean;
    admin: boolean;
    shared: boolean;
    typeevent: boolean;
    public: boolean;

    constructor(private object: Object) {
        // general data
        this.title = object.formdata.title;
        this.id = object.id; //   encrypted
        this.description = object.formdata.description;
        this.questions = object.formdata.questions;
        this.hashtags = object.formdata.hashtags;
        this.timestamp = object.formdata.timestamp;
        this.admin = object.formdata.admin;
        this.expired = object.formdata.expired;
        this.shared = object.formdata.shared;
        this.public = object.formdata.public;
        this.typeevent = object.formdata.typeevent;
        this.answered = false;
        this.plotdata = null;
        this.viewGraphsbool = false;

        // author info
        if (object.author != null) {
            if (object.author.anonymous == false) {
                this.author = object.author.name;
                this.authorlink = object.author.link;
                this.authorlinkdisabled = false;
                // deal with picture
                if (object.author.facebookID != null) {
                    this.pic = object.author.facebookID;
                    this.pictype = "fb";
                } else {
                    if (object.author.pic != null) {
                        this.pictype = "local";
                        this.pic = object.author.pic;
                    } else {
                        this.pictype = "default";
                        this.authorgender = object.author.gender;
                    }
                }
            } else {
                this.author = "Anonymous";
                this.authorlink = "";
                this.authorlinkdisabled = true;
                this.pictype = "anonymous";
            }
        } else {
            this.setFailed();
        }
    }

    setAnswered(input) {
        this.answered = input;
    }

    setShowData(input) {
        this.showdata = input;
    }

    setFailed() {
        this.author = "Loading failed.";
        this.authorlink = "";
        this.authorlinkdisabled = true;
        this.pictype = "default";
    }

    setPlotData(input) {
        this.plotdata = [];
        this.plotdata = this.plotdata.concat(input);
    }

    viewGraphs(input) {
        this.viewGraphsbool = input;
    }

}