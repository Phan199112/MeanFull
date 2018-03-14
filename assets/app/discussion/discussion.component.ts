import { Component, Input, ElementRef } from "@angular/core";
import { DiscussionModel } from "./discussion.model";
import { Http } from "@angular/http";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'discussion-item',
    templateUrl: './discussion.component.html',
    styleUrls: ['./discussion.component.scss'],
})
export class DiscussionComponent {
    @Input() data: DiscussionModel;
    @Input() ind: number;
    hide: boolean;

    constructor(
        private http: Http,
        private route: ActivatedRoute,
        private elementRef: ElementRef
    ) {}

    ngAfterViewInit() {
        this.route.params.subscribe(params => {
            if (params.message && params.message == this.data.id) {
                setTimeout(() => {
                    this.elementRef.nativeElement.scrollIntoView();
                    window.scrollBy(0, -63.5);
                }, 500);
            }
        }); 
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