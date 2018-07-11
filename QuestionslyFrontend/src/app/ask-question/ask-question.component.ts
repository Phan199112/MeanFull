import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss']
})
export class AskQuestionComponent implements OnInit {

  activeDimmer: boolean = false;
  selection: string = '';
  questionType: string = 'shortanswer';
  question: string = '';

  constructor() { }

  ngOnInit() {
  }


  activateDimmer() {
    this.activeDimmer = true;
  }

  deactivateDimmer() {
    if (this.question) {
      return;
    } else {
      this.activeDimmer = false;
    }
  }

  toolbarSelect(item: string) {
    if (item === this.selection) {
      this.selection = '';
    } else {
      this.selection = item;
    }
  }

  questionSelect(item: string) {
    const toolbarSelect = this.toolbarSelect.bind(this);
    if (item === this.questionType) {
      window.setTimeout(() => { toolbarSelect(this.selection)}, 1500);
      
    } else {
      this.questionType = item;
      window.setTimeout(() => { toolbarSelect(this.selection)}, 1500);
    }
  }

  isQuestionEmpty(val: string) {
    if(this.question && !this.activateDimmer) {
      this.activateDimmer()
    }
  }

}
