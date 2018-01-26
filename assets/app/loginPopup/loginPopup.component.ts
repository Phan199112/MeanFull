import { Component, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {UserService} from "../user.service";

@Component({
  selector: 'login-popup',
  templateUrl: './loginPopup.component.html',
  styleUrls: ['./loginPopup.component.scss'],
  providers: [UserService]
})
export class LoginPopupComponent {
  @ViewChild('content') content;
  
  constructor(
    private modalService: NgbModal,
    private userService: UserService    
  ) {}

  open() {
    this.modalService.open(this.content);
  }

  check() {
    this.userService.afterLoginCheck().then(response => {
      if (response === 0) {
        this.open();
      }
    });      
  }
}