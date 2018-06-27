import { Component, OnInit } from '@angular/core';
import {FormService} from '../form.service';
import {UserService} from '../user.service';

@Component({
    selector: 'app-share-form',
    templateUrl: './share-form.component.html',
    styleUrls: ['./share-form.component.scss'],
    providers: [FormService, UserService]
})

export class ShareFormComponent implements OnInit {
    link: string;
    reject = false;

    constructor(private formService: FormService,
                private userService: UserService) {}

    ngOnInit() {
        this.userService.afterLoginCheck().then(userData => {
            if (userData) {
                this.link = `https://www.questionsly.com/takeForm/${this.formService.getData().id}`;
            } else {
                this.reject = true;
            }
        });
    }
}
