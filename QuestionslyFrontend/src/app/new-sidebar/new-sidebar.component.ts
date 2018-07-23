import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { MygroupsService } from '../mygroups.service';
import { UserService } from '../user.service';
import { group } from '../../../node_modules/@angular/animations';
import { OrganizationService } from '../organization.service';

@Component({
    selector: 'app-new-sidebar',
    templateUrl: './new-sidebar.component.html',
    styleUrls: ['./new-sidebar.component.scss']
})
export class NewSidebarComponent implements OnInit {

    public static categories: Array<any> = [];
    public static orgName = '';
    public static createGroupCategory: any;
    public open: boolean = false;
    public groupId: string = '';

    public classReference = NewSidebarComponent;
    public canCreateClasses = false;

    @Input() activeGroup: string;
    @ViewChild('createGroupModal') createGroupModal;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private myGroupsService: MygroupsService,
        private userService: UserService,
        private organizationService: OrganizationService,
    ) {
    }

    ngOnInit() {
        this.userService.onChange(user => {
            this.canCreateClasses = user.role !== 'student';
        });

        this.myGroupsService.onChange(data => {
            NewSidebarComponent.categories = [];
            for (const category of Object.keys(data.c)) {
                NewSidebarComponent.categories.push(data.c[category]);
            }
        });

        this.organizationService.onReady(function (org) {
            this.classReference.orgName = org.name;
        }.bind(this));
    }

    // category is an object from the backend
    openCreateGroupModal(category: any) {
        NewSidebarComponent.createGroupCategory = category;
        const ref = this.modalService.open(this.createGroupModal);
        this.router.events
            .subscribe((event: NavigationStart) => {
                ref.close();
            });
    }

    toggleSidebar(val: boolean) {
        this.open = !this.open;
    }
}
