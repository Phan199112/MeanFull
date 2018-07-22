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
    title: string = '';
    isGroupAdmin: boolean = false;

    constructor(
        private userService: UserService,
        private router: Router,
        public myGroupService: MygroupsService,
        private organizationService: OrganizationService,
    ) { }

    selectedClass: string = '';

    ngOnInit() {
        if (this.userService.getRole() === 'admin' || this.userService.getRole() === 'professor') {
            this.isGroupAdmin = true;
        }
    }

    ngOnChanges() {
        if (this.activeGroupId) {
            this.myGroupService.onReady(function () {
                if (this.activeGroupId) {
                    this.title = this.myGroupService.getGroupById(this.activeGroupId).title;
                }
            }.bind(this));
        } else {
            this.organizationService.onReady(function () {
                this.title = this.organizationService.getOrgName();
            }.bind(this));
        }
    }

    toggleSidebar() {
        this.toggle.emit(true);
    }

    setTitle(title: string) {
        this.title = title;
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
