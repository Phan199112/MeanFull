import { Component, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../user.service';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss'],
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

  check(loginRequired) {
    if (loginRequired === true) {
        this.userService.afterLoginCheck().then(response => {
            if (response === 0) {
                this.open();
            }
        });
    }
  }
}
