import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { MygroupsService } from '../mygroups.service';
import { UserService } from '../user.service';
import { group } from '../../../node_modules/@angular/animations';

@Component({
    selector: 'app-new-sidebar',
    templateUrl: './new-sidebar.component.html',
    styleUrls: ['./new-sidebar.component.scss']
})
export class NewSidebarComponent implements OnInit {

    public static categories: Array<any> = [];
    public static orgName = '';
    public static createGroupCategory: any;
    open: boolean = false;

    public classReference = NewSidebarComponent;
    public canCreateClasses = false;

    @Input() activeGroup: string;
    @Output() selectedGroup: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('createGroupModal') createGroupModal;

    constructor(
        private http: Http,
        private modalService: NgbModal,
        private router: Router,
        private route: ActivatedRoute,
        private myGroupsService: MygroupsService,
        private userService: UserService,
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
                this.updateNavbar();
            }
        });

        this.userService.onChange(user => {
            this.canCreateClasses = user.role !== 'student';
        });

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
