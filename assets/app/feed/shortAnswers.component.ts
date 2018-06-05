import { Component, ViewChild, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {UserService} from "../user.service";

@Component({
  selector: 'short-answers',
  templateUrl: './shortAnswers.component.html',
  styleUrls: ['./shortAnswers.component.scss'],
  providers: [UserService]
})
export class ShortAnswers {
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
