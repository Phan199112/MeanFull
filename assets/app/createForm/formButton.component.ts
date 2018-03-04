import { Component } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validators} from "@angular/forms";

@Component({
    selector: 'form-buttons',
    templateUrl: './formButton.component.html',
    styleUrls: ['./formButton.component.scss'],
    providers: [{provide: NG_VALUE_ACCESSOR, multi: true, useExisting: FormButtons}]
})
export class FormButtons implements ControlValueAccessor {
    type: string;
    _onChange: (value: any) => void;

    constructor() {
        this.type = "Radio";
    }


    writeValue(value: any) {
        this.type = value;
    }

    registerOnChange(fn: (value:any) => void) {
        this._onChange = fn;
    }

    registerOnTouched(){}

    toggle(newType: string) {
        this.type = newType;
        this._onChange(newType);
    }
}
