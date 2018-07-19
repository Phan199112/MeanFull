import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent {

    public members = [];

    constructor(
        private http: Http,
    ) { }

    @Input()
    set activeGroup(activeGroup: string) {
        let url = '/users/feedlist';
        if (activeGroup) {
            url = '/group/' + activeGroup + '/members';
        }

        this.http.get(url)
        .toPromise()
        .then(response => {
            const responseJson = response.json();

            this.members = [];
            if (responseJson.status === 1) {
                this.members = responseJson.members ? responseJson.members : responseJson.data;
            }
        });
    }
}
