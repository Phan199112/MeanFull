import { Component, Input, Output, EventEmitter } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validators} from "@angular/forms";


@Component({
    selector: 'app-form-buttons',
    templateUrl: './form-button.component.html',
    styleUrls: ['./form-button.component.scss'],
    providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: FormButtonComponent }]
})
export class FormButtonComponent {
    @Input() qKind: string;
    @Input() active: string;
    @Output() selected : EventEmitter<string> = new EventEmitter<string> ();
    _onChange: (value: any) => void;

    constructor() {

    }

    writeValue(value: any) {}

    registerOnChange(fn: (value:any) => void) {
        this._onChange = fn;
    }

    registerOnTouched(){}

    toggle(newType: string) {
        this.selected.emit(this.qKind);        
        this._onChange(newType);
    }
}
