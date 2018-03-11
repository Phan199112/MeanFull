import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'stars-question',
  templateUrl: './starsQuestion.component.html',
  styleUrls: ['./starsQuestion.component.scss']
})
export class StarsQuestionComponent extends Component {
  @Input() scale: Array<any>;
  @Output() rating: EventEmitter<number> = new EventEmitter<number>();

  temp: number = 0;
  
  initialized: Boolean = false;

  constructor() {
    window.console.log("New star value: ", temp);
  }



  setValue(i: number) {
    // window.console.log("New star value: ", temp);
    this.rating.emit(i);
    this.temp = i;
  }



}