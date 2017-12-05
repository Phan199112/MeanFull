import { Component, Input } from "@angular/core";
import {TagModel} from "./tag.model";

@Component({
    selector: 'tag-component',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.scss']
})
export class TagComponent {
    @Input() tag: TagModel;

    constructor() {

    }

}