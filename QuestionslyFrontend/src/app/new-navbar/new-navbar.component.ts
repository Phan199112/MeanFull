import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-navbar',
  templateUrl: './new-navbar.component.html',
  styleUrls: ['./new-navbar.component.scss']
})
export class NewNavbarComponent implements OnInit {

  @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();
  title: string = '';

  constructor() { }

  selectedClass: string = '';

  ngOnInit() {
  }

  toggleSidebar() {
    this.toggle.emit(true);
  }

  setTitle(title: string) {
    this.title = title;
  }


}
