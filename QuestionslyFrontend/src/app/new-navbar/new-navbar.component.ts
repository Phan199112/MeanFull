import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';


@Component({
  selector: 'app-new-navbar',
  templateUrl: './new-navbar.component.html',
  styleUrls: ['./new-navbar.component.scss'],
  providers: [UserService]
})
export class NewNavbarComponent implements OnInit {

  @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();
  title: string = '';
  currentTab: string = 'all';
  showSettings: boolean = false;
  user: string = '';
  isGroupAdmin: boolean = false;

  constructor(private userService: UserService) { }

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

  toggleTab(tab: string) {    
    if (this.currentTab !== tab) {
      this.currentTab = tab;

      if (tab === 'settings') {
        this.showSettings = true;
      } else {
        this.showSettings = false;
      }

      if (tab === 'myposts') {
        this.user = this.userService.getUser().dbid;
      } else {
        this.user = '';
      }
    }


  }


}
