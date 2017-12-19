import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { TagModel } from "./tag.model";
import { Http } from "@angular/http";
import { Router, ActivatedRoute } from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
    selector: 'tag-list',
    templateUrl: './tag.list.component.html',
    styleUrls: ['./tag.list.component.scss'],
})
export class TagListComponent implements OnInit, OnDestroy {
    taglist: TagModel[] = [];
    data: Object[];
    tagsearch: FormGroup;

    @Input() user: String;
    @Input() comm: String;

    constructor(private fb: FormBuilder, private http: Http,
                private route: ActivatedRoute, private _sanitizer: DomSanitizer,
                private router: Router) {
    }

    ngOnInit() {
        // init the form
        this.tagsearch = this.fb.group({
            searchword: ['', Validators.compose([Validators.minLength(2), Validators.required])]
        });

        // provide data to the list
        this.retrieveData();

    }

    ngOnDestroy() {
        //
    }

    retrieveData() {
        this.http.post(`/tags/list`, {user: this.user, comm: this.comm}).toPromise()
            .then(res => {
                if (res.json().status == 1) {
                    this.data = res.json().data;

                    if (this.data !== null) {
                        for (let obj of this.data) {
                            this.taglist.push(new TagModel(obj));
                        }
                    }
                }
            })
            .catch(error => alert("Error retrieving form: " + error));
    }


    myListFormatter(data: any): string {
        return `${data.tag} (${data.count})`;
    }

    checkSubmit() {
        this.setAsTouched(this.tagsearch);
        if (this.tagsearch.invalid) {
            this.tagsearch.wasChecked = true;
        } else {
            this.Submit();
        }
    }

    Submit() {
        this.router.navigate(['/feed', {'tag': this.tagsearch.value.searchword}]);
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


    /// search
    observableSource(keyword: any): Observable<any[]> {
        if (keyword) {
            return this.http.post('/search', {type: 'tag', keyword: keyword})
                .map(this.observableProcess.bind(this))
                .catch(err => {
                    return [];
                });
        } else {
            return Observable.of([]);
        }
    }

    observableProcess(data) {
        if (data.json().status == 1) {
            let searchoutput = [];
            let results = data.json().results;
            for (let l=0; l < results.length; l++) {
                searchoutput.push({tag: results[l].word, count: results[l].data[0]});
            }
            return searchoutput;
        } else {
            return [];
        }
    }

}