import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperComponent } from 'ngx-image-cropper';
import * as b64ToBlob from 'b64-to-blob';
import { setTimeout } from 'core-js/library/web/timers';

@Component({
  selector: 'app-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.scss']
})
export class ImageEditorComponent {
  @Input() imgChangedEvent: any;
  @Output() done = new EventEmitter<boolean>();

  @ViewChild('content') content;
  @ViewChild(ImageCropperComponent) cropper;
  cropped: any;
  imgLoaded: Boolean = false;

  constructor(private modalService: NgbModal) {}

  open() {
    this.modalService.open(this.content).result.then((result) => {
      this.imgLoaded = false;
      var data = this.cropped.substring(this.cropped.indexOf(";base64,") + 8);
      var type = this.cropped.substring(this.cropped.indexOf("data:") + 5, this.cropped.indexOf(";base64,"));
      var file = b64ToBlob(data, type);
      file.name = this.imgChangedEvent.target.files[0].name;
      this.done.emit(file);
    }, (reason) => {
      this.imgLoaded = false;
      this.done.emit(this.imgChangedEvent.target.files[0]);
    });
  }

  onImgLoaded() {
    setTimeout(() => this.imgLoaded = true, 500);
  }

}
