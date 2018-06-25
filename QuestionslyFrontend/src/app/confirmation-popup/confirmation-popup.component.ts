import { Component, ViewChild, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmationPopup.component.html',
  styleUrls: ['./confirmationPopup.component.scss']
})
export class ConfirmationPopupComponent {
  @ViewChild('content') content;
  @Input() text: string;

  constructor(
    private modalService: NgbModal
  ) {}

  open() {
    return this.modalService.open(this.content);
  }

  confirm(text) {
    this.text = text;
    return this.open().result;
  }
}
