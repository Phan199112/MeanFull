import { Component, Input, ViewChild } from "@angular/core";
import { YourCommunitiesModel } from "./yourcomm.model";
import { Http } from "@angular/http";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'your-comm-component',
    templateUrl: './yourcomm.component.html',
    styleUrls: ['./yourcomm.component.scss']
})
export class YourCommunityComponent {
    @Input() comm: YourCommunitiesModel;
    sharedAlready: boolean = false;
    @ViewChild('shareModal') shareModal;



    constructor(private http: Http, private modalService: NgbModal) {

    }

    shareInComm() {
        this.http.post(`/community/shareform`, {commid: this.comm.id, formid: this.comm.link, pic: this.comm.pic}).toPromise()
            .then((result) => {
                if (result.json().status == 1) {
                    this.sharedAlready = true;
                } else {
                    console.log("failed comm share request");
                }
                //

            })
            .catch(function() {
                //console.log("failed comm share request");
            });

    }

    closeModal() {
        this.modalService.close(this.shareModal);

    }
}