import { Component, Input, Output, EventEmitter } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validators} from "@angular/forms";


@Component({
    selector: 'form-buttons',
    templateUrl: './formButton.component.html',
    styleUrls: ['./formButton.component.scss'],
    providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: FormButtons }]
})
export class FormButtons {
    @Input() qKind: string;
    @Input() active: string;
    @Output() selected : EventEmitter<string> = new EventEmitter<string> ();
    // _onChange: (value: any) => void;

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
