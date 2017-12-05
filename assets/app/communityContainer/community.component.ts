import { Component, Input } from "@angular/core";
import { CommunityModel } from "./community.model";

@Component({
    selector: 'community-component',
    templateUrl: './community.component.html',
    styleUrls: ['./community.component.scss']
})
export class CommunityComponent {
    @Input() commdata: CommunityModel;

    constructor() {

    }

}