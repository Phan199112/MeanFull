import { Component, Input } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validators} from "@angular/forms";


@Component({
    selector: 'form-buttons',
    templateUrl: './formButton.component.html',
    styleUrls: ['./formButton.component.scss'],
    providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: FormButtons }]
})
export class FormButtons implements ControlValueAccessor {
    @Input() qKind: string;
    @Input() active: string;
    _onChange: (value: any) => void;

    constructor() {
    }


    writeValue(value: any) {
        // this.qKind = value;
    }

    registerOnChange(fn: (value:any) => void) {
        this._onChange = fn;
    }

    registerOnTouched(){}

    toggle(newType: string) {
        // this.qKind = newType;
        this._onChange(newType);
    }
}
