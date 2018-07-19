import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationStart } from '@angular/router';
import { MygroupsService } from '../mygroups.service';

@Component({
    selector: 'app-new-sidebar',
    templateUrl: './new-sidebar.component.html',
    styleUrls: ['./new-sidebar.component.scss']
})
export class NewSidebarComponent implements OnInit {

    public static categories: Array<any> = [];
    public static orgName = '';
    public static createGroupCategory: any;

    public classReference = NewSidebarComponent;

    @Input() activeGroup: string;
    @ViewChild('createGroupModal') createGroupModal;

    constructor(
        private http: Http,
        private modalService: NgbModal,
        private router: Router,
        private myGroupsService: MygroupsService,
    ) {

    }

    ngOnInit() {
        this.myGroupsService.onChange(data => {
            NewSidebarComponent.categories = [];
            for (const category of Object.keys(data.c)) {
                NewSidebarComponent.categories.push(data.c[category]);
            }
        });

        this.http.get('/organizations/mine')
            .toPromise()
            .then(response => {
                const responseJson = response.json();

                NewSidebarComponent.orgName = responseJson.organization.name;
            });
    }

    // category is an object from the backend
    openCreateGroupModal(category: any) {
        NewSidebarComponent.createGroupCategory = category;
        const ref = this.modalService.open(this.createGroupModal);
        this.router.events
            .filter(event => event instanceof NavigationStart)
            .subscribe((event: NavigationStart) => {
                ref.close();
            });
    }

}
