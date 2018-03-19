
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
    viewGraphsbool: boolean = false;
    viewTablesbool: boolean = false;
    hashtags: string[];
    categories: string[];
    showdata: boolean;
    expired: boolean;
    admin: boolean;
    shared: boolean;
    typeevent: boolean;
    public: boolean;
    download: string;
    found: boolean;
    highlight: boolean;
    loginRequired: boolean;
    eventdatatotals: any[];
    eventplot: boolean = false;
    reactions: any;

    constructor(private object: Object) {
        this.found = object.found;

        if (this.found) {
            // general data
            this.title = object.formdata.title;
            this.id = object.id; //   encrypted
            this.description = object.formdata.description;
            this.questions = object.formdata.questions;
            this.hashtags = object.formdata.hashtags;
            this.timestamp = object.formdata.timestamp;
            this.reactions = object.formdata.reactions;
            this.admin = object.formdata.admin;
            this.expired = object.formdata.expired;
            this.shared = object.formdata.shared;
            this.public = object.formdata.public;
            this.typeevent = object.formdata.typeevent;
            this.loginRequired = object.formdata.loginRequired;
            this.categories = object.formdata.categories;
            this.answered = false;
            this.plotdata = null;
            this.viewGraphsbool = false;
            this.download = "./forms/download/"+this.id;
            this.highlight = object.highlight;

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