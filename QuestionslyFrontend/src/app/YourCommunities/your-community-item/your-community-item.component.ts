import { Component, Input, ViewChild } from "@angular/core";
import { YourCommunitiesModel } from "../your-community.model";
import { Http } from "@angular/http";
import { NgbActiveModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-your-comm-component',
    templateUrl: './your-community-item.component.html',
    styleUrls: ['./your-community-item.component.scss']
})
export class YourCommunityItemComponent {
    @Input() comm: YourCommunitiesModel;
    sharedAlready: boolean = false;
    @ViewChild('shareModal') shareModal;



    constructor(private http: Http, private modalService: NgbActiveModal) {

    }

    shareInComm() {
        this.http.post(`/community/shareform`, {commid: this.comm.id, formid: this.comm.link, pic: this.comm.pic}).toPromise()
            .then((result) => {
                if (result.json().status == 1) {
                    this.sharedAlready = true;
                } else {
                    // console.log("failed comm share request");
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