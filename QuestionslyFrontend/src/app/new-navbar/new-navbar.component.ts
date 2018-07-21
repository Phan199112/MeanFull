import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UserService } from '../user.service';
import { MygroupsService } from '../mygroups.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-navbar',
  templateUrl: './new-navbar.component.html',
  styleUrls: ['./new-navbar.component.scss'],
  providers: [UserService]
})
export class NewNavbarComponent implements OnInit {

    @Input() activeGroupId: string;
    @Input() activeSubsection: string;

    @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();
    title: string = '';
    isGroupAdmin: boolean = false;

    constructor(
        private userService: UserService,
        private router: Router,
        public myGroupService: MygroupsService,
    ) { }

    selectedClass: string = '';

    ngOnInit() {
        if (this.userService.getRole() === 'admin' || this.userService.getRole() === 'professor') {
            this.isGroupAdmin = true;
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
