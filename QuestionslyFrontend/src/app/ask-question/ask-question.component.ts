import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
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
  pic: string = '';
  tempQuestion: string = '';
  getQuestionData: boolean = false;
  questionsContainer: any = [];
  preview: boolean = false;
  title: string = '';
  addTitle: boolean = false;
  kindsWithOptions: string[] = ["Multiple Choice", "Checkboxes", "Drop-down", "Rank"];
  alphabeth: string = "abcdefghijklmnopqrstuvwxyz";


  @ViewChild('mc') mc: MultipleChoiceFormComponent;
  @ViewChild('rc') rc: RatingFormComponent;
  @ViewChild('nc') nc: NumberQuestionFormComponent;


  constructor(
    private http: Http,
    private router: Router,
    private route: ActivatedRoute
  ) { }

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
    data.body = this.tempQuestion;
    data.required = true;
    data.pic = this.pic;
    this.questionsContainer.push(data);
    this.pic = '';
    console.log(data);
  }


  getData(type: string) {
    this.tempQuestion = this.question;
    this.question = '';


    if (this.questionType === 'shortanswer') {
      this.questionsContainer.push({body: this.tempQuestion, kind: 'Short Answer', pic: this.pic});
      this.pic = '';
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


  submitForm() {
    const formData = this.questionnaireData();
    this.http.post('/forms/create', formData).toPromise()
      .then(response => {
        // formData.id = response.json().id;
        // this.shareLink = `https://www.questionsly.com/feed;survey=${formData.id}`;
        // this.formService.setData(formData);
        this.questionsContainer = [];
        this.questionType = 'shortanswer';
        this.preview = false;
        this.activeDimmer = false;
      })
      .catch(error => this.router.navigate(['/users/login']));
  }

  questionnaireData() {

    const data = this.questionsContainer;

    data.forEach((q, i) => data[i].number = i);

    for (let i = 0; i < data.length; i++) {
      if (this.kindsWithOptions.indexOf(data[i].kind) !== -1) {
        for (let j = 0; j < data[i].options.length; j++) {
          data[i].options[j].label = this.alphabeth[j];
        }
      }
    }

    // for (let tagField of ['hashtags', 'sharedWith']) {
    //   if (data[tagField]) {
    //     data[tagField] = data[tagField].map(tag => tag.value ? tag.value : tag);
    //   }
    // }


    return data;
  }


    /*
  Function to carry out the actual PUT request to S3 using the signed request from the app.
  */
  uploadFile(file, signedRequest, url) {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.pic = url;
        } else {
          alert('Could not upload file.');
        }
      }
    };
    xhr.send(file);
  }
  /*
    Function to get the temporary signed request from the app.
    If request successful, continue to upload the file using this signed
    request.
  */
  getSignedRequest(file) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          this.uploadFile(file, response.signedRequest, response.url);
        } else {
          alert('Could not get signed URL.');
        }
      }
    };
    xhr.send();
  }


  onPicChange($event) {
    const file = $event.target.files[0];
    if (file == null) {
      return alert('No file selected.');
    }
    this.getSignedRequest(file);
  }

  setPicUrl(url) {
    this.pic = url;
  }

}
