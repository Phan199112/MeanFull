import { Component, Input, Output, EventEmitter } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validators} from "@angular/forms";


@Component({
    selector: 'app-switch-buttons',
    templateUrl: './switch-buttons.component.html',
    styleUrls: ['./switch-buttons.component.scss'],
    providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: SwitchButtonsComponent }]
})
export class SwitchButtonsComponent {
    @Input() title: string;
    @Input() option: string;
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
        this.selected.emit(this.option);
        this._onChange(newType);
    }
}
