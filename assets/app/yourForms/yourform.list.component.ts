import { Component, OnInit } from "@angular/core";
import { YourFormModel } from "./yourform.model";
import { Http } from "@angular/http";

@Component({
    selector: 'yourform-list',
    templateUrl: './yourform.list.component.html',
    styleUrls: ['./yourform.list.component.scss']
})
export class YourFormListComponent implements OnInit {
    yourformlist: YourFormModel[] = [];
    data: Object[];
    visible: boolean = false;

    constructor(private http: Http) {
    }

    ngOnInit() {
        this.http.get(`/forms/mylist`).toPromise()
            .then(res => {
                if (res.json().status == '1') {
                    this.data = res.json().data;

                    for (let obj of this.data) {
                        this.yourformlist.push(new YourFormModel(obj));
                    }

                    if (this.yourformlist.length > 0) {
                        this.visible = true;
                    }
                }

            })
            .catch(error => alert("Error retrieving form: " + error));
    }
}