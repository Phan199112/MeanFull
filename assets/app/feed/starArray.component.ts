import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validators} from "@angular/forms";


@Component({
    selector: 'star-array',
    templateUrl: './starArray.component.html',
    styleUrls: ['./starArray.component.scss'],
    providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: StarsArray }]
})
export class StarsArray implements OnInit {
    @Input() rating: number = -1;
    @Input() scale: any;
    @Output() selected : EventEmitter<number> = new EventEmitter<number> ();
    temp: Array<any> = Array(this.scale);
    _onChange: (value: any) => void;


    constructor() {
    }

    ngOnInit() {
        this.scale = Number(this.scale);
        this.temp = Array(this.scale);
    }

    writeValue(value: any) {}

    registerOnChange(fn: (value:any) => void) {
        this._onChange = fn;
    }

    registerOnTouched(){}

    toggle(rating: number) {
        window.console.log("Rating is: ", rating)
        this.rating = rating;
        this.selected.emit(this.rating +1);        
    }
}
