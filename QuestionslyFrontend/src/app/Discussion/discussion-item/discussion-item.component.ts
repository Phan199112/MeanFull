import { Component, Input, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { DiscussionModel } from '../discussion.model';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-discussion-item',
    templateUrl: './discussion-item.component.html',
    styleUrls: ['./discussion-item.component.scss'],
})
export class DiscussionItemComponent implements OnInit {
    @Input() data: DiscussionModel;
    @Input() ind: number;
    hide: boolean;
    firstName: string;

    constructor(
        private http: Http,
        private route: ActivatedRoute,
        private elementRef: ElementRef
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params.message && params.message == this.data.id) {
                setTimeout(() => {
                    this.elementRef.nativeElement.scrollIntoView();
                    window.scrollBy(0, -63.5);
                }, 500);
            }
        });

        this.firstName = this.data.author.name.split(' ')[0];
    }

    deleteMessage() {
        // post and get response
        this.http.post('/discussions/delete', {id: this.data.id})
            .toPromise()
            .then(response => {
                if (response.json().status == 1) {
                    this.hide = true;
                }
            });
    }

}
