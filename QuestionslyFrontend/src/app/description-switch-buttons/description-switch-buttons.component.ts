import { Component, Input, Output, EventEmitter } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validators} from '@angular/forms';

@Component({
    selector: 'app-desc-switch-buttons',
    templateUrl: './description-switch-buttons.component.html',
    styleUrls: ['./description-switch-buttons.component.scss'],
    providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DescriptionSwitchButtonsComponent }]
})
export class DescriptionSwitchButtonsComponent {
    @Input() title: string;
    @Input() description: string;
    @Input() option: string;
    @Input() active: string;
    @Output() selected: EventEmitter<string> = new EventEmitter<string> ();
    _onChange: (value: any) => void;

    constructor() {
    }

    writeValue(value: any) {}

    registerOnChange(fn: (value: any) => void) {
        this._onChange = fn;
    }

    registerOnTouched() {}

    toggle(newType: string) {
        this.selected.emit(this.option);
        this._onChange(newType);
    }
}
