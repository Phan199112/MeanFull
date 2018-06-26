import { Component, ViewChild, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../user.service';

@Component({
  selector: 'app-short-answers',
  templateUrl: './short-answers.component.html',
  styleUrls: ['./short-answers.component.scss'],
  providers: [UserService]
})
export class ShortAnswersComponent {
  @Input() answers: any;
  index: number;

  @ViewChild('content') content;

  constructor(
    private modalService: NgbModal,
    private userService: UserService
  ) {}

  open(i: number) {
    this.index = i;
    this.modalService.open(this.content);
  }
}
