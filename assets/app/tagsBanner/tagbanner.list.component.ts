import { Component, OnInit, Input } from "@angular/core";
import { TagModel } from "../tagsContainer/tag.model";

@Component({
    selector: 'tag-banner-list',
    templateUrl: './tagbanner.list.component.html',
    styleUrls: ['./tagbanner.list.component.scss'],
})
export class TagBannerListComponent implements OnInit {
    taglist: TagModel[] = [];

    @Input() data: String[];

    constructor() {
    }

    ngOnInit() {
        // provide data to the list
        if (this.data !== null) {
            for (let obj of this.data) {
                this.taglist.push(new TagModel({tag: obj}));
            }
        }

    }

}