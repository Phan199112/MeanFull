import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-new-sidebar',
    templateUrl: './new-sidebar.component.html',
    styleUrls: ['./new-sidebar.component.scss']
})
export class NewSidebarComponent implements OnInit {

    @Input() activeGroup: boolean;
    @ViewChild('createGroupModal') createGroupModal;

    public categories: Array<any> = [];
    public orgName = '';

    constructor(
        private http: Http,
        private modalService: NgbModal,
    ) {

    }

  ngOnInit() {
    this.http.get('/group/mylist')
        .toPromise()
        .then(response => {
            const responseJson = response.json();

            for (const category of Object.keys(responseJson.categories)) {
                this.categories.push(responseJson.categories[category]);
            }
        });
    this.http.get('/organizations/mine')
        .toPromise()
        .then(response => {
            const responseJson = response.json();

            this.orgName = responseJson.organization.name;
        });
  }

    openCreateGroupModal() {
        this.modalService.open(this.createGroupModal);
    }

}
