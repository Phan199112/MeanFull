import { Component, Input } from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import { UserService } from "../user.service";

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class Sidebar {
    @Input() loggedin: boolean;
    view : string;
    


    constructor() {
        this.view="surveys";
    }

    toggleView(v:string) : void {
        this.view = v;
    }

}