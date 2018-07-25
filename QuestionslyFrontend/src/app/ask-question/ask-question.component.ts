import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { FormControl } from "@angular/forms";
import { MultipleChoiceFormComponent } from '../QuestionForms/multiple-choice-form/multiple-choice-form.component';
import { RatingFormComponent } from '../QuestionForms/rating-form/rating-form.component';
import { NumberQuestionFormComponent } from '../QuestionForms/number-question-form/number-question-form.component';
import * as $ from 'jquery';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MygroupsService } from '../mygroups.service';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss'],

})
export class AskQuestionComponent implements OnInit {

  activeDimmer: boolean = false;
  action: string = 'post';
  selection: string = '';
  questionType: string = 'shortanswer';
  question: string = '';
  pic: string = '';
  doc: string = '';
  vid: string = '';
  tempQuestion: string = '';
  getQuestionData: boolean = false;
  questionsContainer: any = [];
  preview: boolean = false;
  title: string = '';
  addTitle: boolean = false;
  group: FormControl = new FormControl();
  isMobile: boolean = true;
  showDeleteBox: boolean = false;
  kindsWithOptions: string[] = ["Multiple Choice", "Checkboxes", "Drop-down", "Rank"];
  alphabeth: string = "abcdefghijklmnopqrstuvwxyz";
  groups: string[] = ['Class 1', 'Class 2', 'Class 3'];
  filteredGroups: Observable<string[]>;
  docName: string = '';

  @Output() refreshFeed: EventEmitter<boolean> = new EventEmitter<boolean>();


  @ViewChild('mc') mc: MultipleChoiceFormComponent;
  @ViewChild('rc') rc: RatingFormComponent;
  @ViewChild('nc') nc: NumberQuestionFormComponent;


    constructor(
        private http: Http,
        private router: Router,
        private route: ActivatedRoute,
        private myGroupsService: MygroupsService,
    ) {
        this.myGroupsService.onChange(data => {
            this.groups = [];
            data.g.forEach(function (group) {
                this.groups.push(group.title);
            }.bind(this));

            this.filteredGroups = this.group.valueChanges
            .pipe(
                startWith(''),
                map(g => g ? this._filterGroups(g) : this.groups.slice())
            );
        });
    }

  private _filterGroups(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.groups.filter(g => g.toLowerCase().indexOf(filterValue) === 0);
  }


  ngOnInit() {

    //handle dimmer toggling
    const activateDimmer = this.activateDimmer.bind(this);
    const deactivateDimmer = this.deactivateDimmer.bind(this);
    $(window.document).on('click', function(event) {
      if ($(event.target).parents('.askbox').length) {        
        activateDimmer();
        event.stopPropagation();

      } else {        
        event.stopPropagation();
        if (!$(event.target).parents('.deletionBox').length) {
          deactivateDimmer();
        }
      }
    });

  }


  activateDimmer() {
    this.activeDimmer = true;
    $('.fBody, .cBody').css({'z-index': -2});
    // $('nav').css({'z-index': 0});
  }


  deactivateDimmer(bypass: boolean = false) {
      // this.activeDimmer = false;
      // $('.fBody, .cBody').css({ 'z-index': 2 });
      // $('.cBody, nav').css({ 'z-index': 1 });
   
    if (!bypass && (this.question || this.questionsContainer.length > 0)) {
      this.showDeleteBox = true;
    } else {
      this.activeDimmer = false;
      $('.fBody, .cBody').css({ 'z-index': 2 });
      $('.cBody, nav').css({ 'z-index': 1 });
    }
  }


  toolbarSelect(item: string) {
    if (item === this.selection) {
      this.selection = '';
    } else {
      this.selection = item;
      this.activateDimmer();
    }
  }


  questionSelect(item: string) {
    const toolbarSelect = () => {
      this.toolbarSelect(this.selection);
    }

    if (item === this.questionType) {
      window.setTimeout(toolbarSelect, 1500);

    } else {
      this.questionType = item;
      window.setTimeout(toolbarSelect, 1500);
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
    this.questionType = 'shortanswer';
    this.pic = '';
  }


  getData() {


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

  checkSubmit() {
    if (this.action === 'survey') {
      this.getData();
      return;
    } else {
      console.log({ doc: this.doc, pic: this.pic, vid: this.vid }); 
      this.submitForm();
    }
  }


  togglePreview() {
    if (this.preview === false) {
      this.activateDimmer();
    }
    this.preview = !this.preview;
  }

  toggleTitle() {
    this.addTitle = !this.addTitle;
  }


    submitForm() {


        const formData = {
            questions: this.questionnaireData(),
            groupId: this.myGroupsService.getGroupIdByName(this.group.value),
            description: this.question,
            type: this.action,
            doc: this.doc,
            pic: this.pic,
            vid: this.vid
        };

        console.log('description:', formData.description);
                

        this.http.post('/forms/create', formData).toPromise()
        .then(response => {
            // formData.id = response.json().id;
            // this.shareLink = `https://www.questionsly.com/feed;survey=${formData.id}`;
            // this.formService.setData(formData);
            this.questionsContainer = [];
            this.questionType = 'shortanswer';
            this.question = '';
            this.action = 'post';
            this.preview = false;
            this.deactivateDimmer(true);
            this.refreshFeed.emit(true);
            // const refresh = () => {this.refreshFeed.emit(true);};
            // window.setTimeout(refresh, 1000);
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
  uploadFile(file, signedRequest, url, filetype) {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log('Finished Upload.');
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
  getSignedRequest(file, filetype) {
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          console.log('Received signed request.');
          if (filetype === 'pic') {
            this.pic = response.url;
          } else if (filetype === 'doc') {
            this.doc = response.url;
          } else if (filetype === 'vid') {
            this.vid = response.url;
          }
          this.uploadFile(file, response.signedRequest, response.url, filetype);
        } else {
          alert('Could not get signed URL.');
        }
      }
    };
    xhr.send();
  }


  onPicChange($event, filetype: string) {
    const file = $event.target.files[0];    
    if (file == null) {
      return alert('No file selected.');
    }
    this.getSignedRequest(file, filetype);
  }

  setPicUrl(url) {
    this.pic = url;
    const toggle = () => {this.toolbarSelect('')};
    window.setTimeout(toggle, 1500);
  }

  toggleDeleteBox() {    
    this.showDeleteBox = !this.showDeleteBox;
  }

  resetSurvey() {
    this.question = '';
    this.questionsContainer = [];
    this.questionType = 'shortanswer';
    this.selection = '';
    this.pic = '';
    this.title = '';
    this.toggleDeleteBox();
    this.deactivateDimmer();

  }

  actionSelect(action: string) {
    if (this.action !== action) {
      this.action = action;
    }
  }
}
