import { Component, OnInit, OnDestroy, ɵisObservable, Input } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import {UserService} from "../user.service";
import {FormBuilder, FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
    selector: 'network-item',
    templateUrl: './network.component.html',
    styleUrls: ['./network.component.scss'],
})

export class NetworkComponent {
    @Input() data: [Object];

}