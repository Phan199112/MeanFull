import { Component, Input } from "@angular/core";
import { YourFormModel } from "./yourform.model";

@Component({
    selector: 'your-form-component',
    templateUrl: './yourform.component.html',
    styleUrls: ['./yourform.component.scss']
})
export class YourFormComponent {
    @Input() yourform: YourFormModel;

    constructor() {

    }
}