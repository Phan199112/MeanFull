import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'stars-question',
  templateUrl: './starsQuestion.component.html',
  styleUrls: ['./starsQuestion.component.scss']
})
export class StarsQuestionComponent extends Component {
  @Input()
  control: FormControl = new FormControl(0);
  
  initialized: Boolean = false;

  constructor() {}

  ngOnChanges(inputs) {
    console.log(inputs);
    if (inputs.control && !this.initialized) {
      this.control.setValue(0);
      this.initialized = true;
    }
  }
}