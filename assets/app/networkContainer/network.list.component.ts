import { Component, OnInit, OnDestroy, ɵisObservable, Input } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import {UserService} from "../user.service";
import {FormBuilder, FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {NetworkModel} from "./network.model";

@Component({
    selector: 'network-list',
    templateUrl: './network.list.component.html',
    styleUrls: ['./network.list.component.scss'],
})

export class NetworkListComponent implements OnInit {
    networklist: NetworkModel[] = [];

    @Input() data: [Object];

    constructor(private http: Http, private route: ActivatedRoute) {
    }

    ngOnInit() {
        for (let obj of this.data) {
            this.networklist.push(new NetworkModel(obj));
        }
    }
}