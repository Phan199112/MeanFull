import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { UserService } from '../user.service';
import { MygroupsService } from '../mygroups.service';
import { Router } from '@angular/router';
import { OrganizationService } from '../organization.service';

@Component({
  selector: 'app-new-navbar',
  templateUrl: './new-navbar.component.html',
  styleUrls: ['./new-navbar.component.scss'],
  providers: [UserService]
})
export class NewNavbarComponent implements OnInit, OnChanges {

    @Input() activeGroupId: string;
    @Input() activeSubsection: string;

    @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

    title = '';
    isGroupAdmin = false;
    profilePic = '';

    constructor(
        private userService: UserService,
        private router: Router,
        public myGroupService: MygroupsService,
        private organizationService: OrganizationService,
    ) { }

    selectedClass = '';

    ngOnInit() {
        this.profilePic = this.userService.getUser().picdata;
    }

    ngOnChanges() {
        if (this.activeGroupId) {
            this.myGroupService.onReady(function () {
                if (this.activeGroupId) {
                    const group = this.myGroupService.getGroupById(this.activeGroupId);
                    this.title = group.title;
                    // An org admin is an admin of all groups in the org; and there are also admins of specific groups
                    this.isGroupAdmin = group.isGroupAdmin || this.userService.getRole() === 'admin';
                }
            }.bind(this));
        } else {
            this.organizationService.onReady(function () {
                this.title = this.organizationService.getOrgName();
                this.isGroupAdmin = false;
            }.bind(this));
        }
    }

    toggleSidebar() {
        this.toggle.emit(true);
    }

    navigateTo(subsection: any) {
        if (!this.activeGroupId && subsection) {
            this.router.navigate(['/', 'org', subsection]);
            return;
        }
        if (!this.activeGroupId) {
            this.router.navigate(['/']);
            return;
        }

        const group = this.myGroupService.getGroupById(this.activeGroupId);
        this.router.navigate(['/', group.category, this.activeGroupId, subsection]);
    }
}
