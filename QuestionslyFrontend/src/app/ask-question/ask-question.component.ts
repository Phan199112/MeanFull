import { Component, OnInit, ViewChild } from '@angular/core';
import { MultipleChoiceFormComponent } from '../QuestionForms/multiple-choice-form/multiple-choice-form.component';
import { RatingFormComponent } from '../QuestionForms/rating-form/rating-form.component';
import { NumberQuestionFormComponent } from '../QuestionForms/number-question-form/number-question-form.component';
import * as $ from 'jquery';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss'],

})
export class AskQuestionComponent implements OnInit {

  activeDimmer: boolean = false;
  selection: string = '';
  questionType: string = 'shortanswer';
  question: string = '';
  tempQuestion: string = '';
  getQuestionData: boolean = false;
  questionsContainer: any = [];
  preview: boolean = false;
  title: string = '';
  addTitle: boolean = false;
  @ViewChild('mc') mc: MultipleChoiceFormComponent;
  @ViewChild('rc') rc: RatingFormComponent;
  @ViewChild('nc') nc: NumberQuestionFormComponent;


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
      this.activateDimmer();
    }
  }


  pushQuestionToList(data: any) {
    data.question = this.tempQuestion;
    this.questionsContainer.push(data);
    console.log(data);
  }


  getData(type: string) {
    this.tempQuestion = this.question;
    this.question = '';

    if (this.questionType === 'shortanswer') {
      this.questionsContainer.push({question: this.tempQuestion, kind: 'Short Answer', pic: ''});
    }
    if (this.questionType === 'multiplechoice') {
      this.mc.submitQuestion();
    }
    if (this.questionType === 'rating') {
      this.rc.submitQuestion();
    }
    if (this.questionType === 'number') {
      this.nc.submitQuestion();
    }

  }


  togglePreview() {
    if (this.preview === false) {
      this.activeDimmer = true;
    }
    this.preview = !this.preview;
  }

  toggleTitle() {
    this.addTitle = !this.addTitle;
  }

}
