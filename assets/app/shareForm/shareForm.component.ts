import { Component, OnInit } from '@angular/core';
import {FormService} from "../form.service";
import {UserService} from "../user.service";

@Component({
    selector: 'share-form',
    templateUrl: './shareForm.component.html',
    styleUrls: ['./shareForm.component.scss'],
    providers: [FormService, UserService]
})

export class ShareFormComponent implements OnInit {
    link: string;
    reject: boolean = false;

    constructor(private formService: FormService,
                private userService: UserService) {}

    ngOnInit() {
        if (this.userService.getLoggedin() === true) {
            this.link = `https://www.questionsly.com/takeForm/${this.formService.getData().id}`;
        } else {
            this.reject = true;
        }

    }
}