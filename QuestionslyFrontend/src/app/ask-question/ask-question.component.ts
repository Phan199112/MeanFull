import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss']
})
export class AskQuestionComponent implements OnInit {

  activeDimmer: boolean = false;

  constructor() { }

  ngOnInit() {
  }


  activateDimmer() {
    this.activeDimmer = true;
  }
  deactivateDimmer() {
    this.activeDimmer = false;
  }
}
