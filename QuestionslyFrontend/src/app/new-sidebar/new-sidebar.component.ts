import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
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
    @Output() selectedGroup: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('createGroupModal') createGroupModal;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private route: ActivatedRoute,
        private myGroupsService: MygroupsService,
        private userService: UserService,
        private organizationService: OrganizationService,
    ) {

    }

    ngOnInit() {

        this.route.params.subscribe(params => {
            // if (params.edit) this.edit = true;
            // this.createForm();
            if (!params.groupid) {
                if (!this.classReference.orgName) {
                    const initialTitle = () => {this.updateNavbar(this.classReference.orgName)};
                    window.setTimeout(initialTitle, 1000);
                } else {
                    this.updateNavbar(this.classReference.orgName);
                }
            } else {

                this.groupId = params.groupid;
                const updateNavbar = this.updateNavbar.bind(this);
                updateNavbar();
                window.setTimeout(updateNavbar, 1200);

            }
        });

        this.userService.onChange(user => {
            this.canCreateClasses = user.role !== 'student';
        });

        this.myGroupsService.onChange(data => {
            console.log('Data: ', data);

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

    updateNavbar(val: string = '') {
        if (val) {
            this.selectedGroup.emit(val);
        } else {
            this.classReference.categories.forEach((cat, i) => {
                cat.groups.forEach((group, j) => {
                    if (group.id === this.activeGroup) {
                        this.selectedGroup.emit(group.title);
                    }
                });
            });
        }
    }

}
