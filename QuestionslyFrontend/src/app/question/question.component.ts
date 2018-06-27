import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnChanges {
  control: FormControl;
  subFormGroup: FormGroup;
  valueLabel: string;
  @Input()
  data: any = {};
  @Input()
  level: number = 0;
  @Input()
  form: FormGroup;
  @Input()
  disabled: boolean = false;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    if (this.data.type === 'dropdown') {
      this.control = new FormControl('', Validators.required);
    } else {
      this.control = new FormControl(null, Validators.required);
    }
    this.form.addControl(this.data.name, this.control);
    if (this.disabled) {
      this.control.disable();
    }

    if (this.data.subQuestions) {
      this.subFormGroup = new FormGroup({});
      this.form.addControl(this.data.name + "FollowUp", this.subFormGroup);
    }

    this.control.valueChanges.subscribe(value => {
      if (value !== null && value !== '' && this.data.options) {
        this.valueLabel = this.data.options.find(o => o.value == this.control.value).label;
      } else {
        this.valueLabel = "null";
      }
    });
  }

  ngOnChanges(inputs) {
    if (inputs.disabled && this.control) {
      if (inputs.disabled.currentValue) {
        this.control.reset();
        this.control.disable();
      } else {
        this.control.enable();
      }
    }
  }

  keys(obj) {
    return Object.keys(obj);
  }
}
