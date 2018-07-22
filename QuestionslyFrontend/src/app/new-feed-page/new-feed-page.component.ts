import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { UserService } from '../user.service';
import { MygroupsService } from '../mygroups.service';

@Component({
  selector: 'app-new-feed-page',
  templateUrl: './new-feed-page.component.html',
  styleUrls: ['./new-feed-page.component.scss']
})
export class NewFeedPageComponent implements OnInit, OnChanges {

    @Input() viewGroupId: string;
    @Input() viewFilter: string;

    public shareLink = '';

    constructor(
        public userService: UserService,
        private myGroupsService: MygroupsService,
    ) { }

    ngOnInit() {
    }

    ngOnChanges() {
        this.shareLink = '';
        this.myGroupsService.onReady(function () {
            if (this.viewGroupId) {
                const group = this.myGroupsService.getGroupById(this.viewGroupId);
                this.shareLink = '/' + group.category + '/' + group.id + '?t=' + group.shareToken;
            }
        }.bind(this));
    }
}
