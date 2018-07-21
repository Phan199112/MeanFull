import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-new-feed-page',
  templateUrl: './new-feed-page.component.html',
  styleUrls: ['./new-feed-page.component.scss']
})
export class NewFeedPageComponent implements OnInit {

    @Input() viewGroupId: string;
    @Input() viewFilter: string;

    constructor(
        public userService: UserService,
    ) { }

    ngOnInit() {
    }

}
