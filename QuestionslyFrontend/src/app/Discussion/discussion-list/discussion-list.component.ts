import { Component, OnInit, Input } from '@angular/core';
import { DiscussionModel } from '../discussion.model';
import { Http } from '@angular/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { FeedPostModel } from '../../Feed/feed-post.model';

@Component({
    selector: 'app-discussion-list',
    templateUrl: './discussion-list.component.html',
    styleUrls: ['./discussion-list.component.scss'],
})
export class DiscussionListComponent implements OnInit {
    chatlist: DiscussionModel[] = [];
    data: any[];
    newmessage: FormGroup;
    submissionfailed = false;
    hide = false;
    commentsExpanded = false;
    commentSort = 'top';

    previousCommenters: any[] = [];

    @Input() form: FeedPostModel;
    @Input() id: string;
    @Input() pic: string;
    @Input() pictype: string;
    @Input() loggedin: boolean;

    constructor(private fb: FormBuilder, private http: Http) {
    }

    ngOnInit() {
        this.newmessage = this.fb.group({
            message: ['', Validators.compose([Validators.minLength(1), Validators.required])]
        });

        this.retrieveMessages(true);
        // window.console.log("pic: ", this.pic, "pictype:", this.pictype);
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
            (this.newmessage as any).wasChecked = true;
        } else {
            this.Submit();
        }
    }

    Submit() {
        this.preparePreviousCommenters();
        let senddata = {
            formid: this.id,
            message: this.newmessage.value.message,
            previousCommenters: this.previousCommenters,
            firstquestion: this.form.questions[0].body
        };
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

    preparePreviousCommenters(): void {
        this.previousCommenters = this.data.map((comment) => comment.author.id);
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

    expandComment(): void {
        this.commentsExpanded = !this.commentsExpanded;
    }

    autosizeTextarea(event: any, el: any) {
        if (event.keyCode == 13) {
            el.blur();
            this.checkSubmit();
            this.commentsExpanded = true;
        } else {
            setTimeout(function () {
                el.style.cssText = 'height:auto; padding:0; min-height: 23px';
                // for box-sizing other than "content-box" use:
                // el.style.cssText = '-moz-box-sizing:content-box';
                el.style.cssText = 'height:' + (el.scrollHeight) + 'px';
            }, 0);
        }
    }

    toggleSort(view: string) : void {
        this.commentSort = view;
    }
}
