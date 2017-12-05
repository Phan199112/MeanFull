import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { DiscussionModel } from "./discussion.model";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import {FormBuilder, FormArray, FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
    selector: 'discussion-list',
    templateUrl: './discussion.list.component.html',
    styleUrls: ['./discussion.list.component.scss'],
})
export class DiscussionListComponent implements OnInit {
    chatlist: DiscussionModel[] = [];
    data: Object[];
    newmessage: FormGroup;
    submissionfailed: boolean = false;
    hide: boolean = false;

    @Input() id: String;

    constructor(private fb: FormBuilder, private http: Http) {
    }

    ngOnInit() {
        this.newmessage = this.fb.group({
            message: ['', Validators.compose([Validators.minLength(1), Validators.required])]
        });

        // retrieve
        this.retrieveMessages( true);
    }

    // retrieve message list for this form
    retrieveMessages(clean) {
        this.http.post('/discussions/list', {formid: this.id}).toPromise()
            .then(response => {
                if (response.json().status == 1) {
                    // clean?
                    if (clean == true) {
                        // clean current data list
                        var l = this.chatlist.length;
                        while (l--) {
                            this.chatlist.splice(l, 1);
                        }
                    }

                    // only add the new messages
                    let start = this.chatlist.length;

                    // update
                    this.data = response.json().data;
                    console.log(this.data);
                    if (this.data !== null) {
                        for (let i = start; i < this.data.length; i++) {
                            this.chatlist.push(new DiscussionModel(this.data[i]));
                        }
                    }
                }
            })
            .catch(error => function (error) {
                // error
            });

    }


    // submit new message
    checkSubmit() {
        this.setAsTouched(this.newmessage);
        if (this.newmessage.invalid) {
            this.newmessage.wasChecked = true;
        } else {
            this.Submit();
        }
    }

    Submit() {
        let senddata = {formid: this.id, message: this.newmessage.value.message};
        this.http.post('/discussions/new', senddata).toPromise()
            .then(response => {
                if (response.json().status == 1) {
                    this.submissionfailed = false;
                    this.retrieveMessages( true);
                    this.newmessage.reset();
                } else {
                    this.submissionfailed = true;
                    this.retrieveMessages( true);
                }
            })
            .catch(error => function (error) {
                this.submissionfailed = true;
                alert("Error posting form: " + error);
            });
    }

    setAsTouched(group) {
        group.markAsTouched();
        for (let i in group.controls) {
            if (group.controls[i] instanceof FormControl) {
                group.controls[i].markAsTouched();
            } else {
                this.setAsTouched(group.controls[i]);
            }
        }
    }

}