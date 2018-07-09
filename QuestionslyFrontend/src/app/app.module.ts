// Third party
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragulaModule } from 'ng2-dragula';
import { TagInputModule } from 'ngx-chips';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { NgForageModule } from 'ngforage';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { ShareButtonModule } from '@ngx-share/button';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CookieService } from 'ngx-cookie-service';

// From our app
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ConfirmationPopupComponent } from './confirmation-popup/confirmation-popup.component';
import { CreateCommunityComponent } from './create-community/create-community.component';
import { MultipleChoiceFormComponent } from './QuestionForms/multiple-choice-form/multiple-choice-form.component';
import { NumberQuestionFormComponent } from './QuestionForms/number-question-form/number-question-form.component';
import { RatingFormComponent } from './QuestionForms/rating-form/rating-form.component';
import { ShortAnswerFormComponent } from './QuestionForms/short-answer-form/short-answer-form.component';
import { CreateFormComponent } from './create-form/createForm.component';
import { DescriptionSwitchButtonsComponent } from './description-switch-buttons/description-switch-buttons.component';
import { FormButtonComponent } from './form-button/form-button.component';
import { SwitchButtonsComponent } from './switch-buttons/switch-buttons.component';
import { DiscussionItemComponent } from './Discussion/discussion-item/discussion-item.component';
import { DiscussionListComponent } from './Discussion/discussion-list/discussion-list.component';
import { FeedFormComponent } from './feed-form/feed-form.component';
import { FeedListComponent } from './feed-list/feed-list.component';
import { FeedPageComponent } from './feed-page/feed-page.component';
import { MiniShowFormComponent } from './mini-show-form/mini-show-form.component';
import { ShortAnswersComponent } from './short-answers/short-answers.component';
import { StarArrayComponent } from './star-array/star-array.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ImageEditorComponent } from './image-editor/image-editor.component';
import { LoginComponent } from './login/login.component';
import { LoginPopupComponent } from './login-popup/login-popup.component';
import { NetworkItemComponent } from './Network/network-item/network-item.component';
import { NetworkListComponent } from './Network/network-list/network-list.component';
import { ProfileComponent } from './profile/profile.component';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { QuestionComponent } from './question/question.component';
import { SettingsComponent } from './settings/settings.component';
import { ShareFormComponent } from './share-form/share-form.component';
import { CommunityImageComponent } from './Sidebar/community-image/community-image.component';
import { RightPanelComponent } from './Sidebar/right-panel/right-panel.component';
import { SidebarComponent } from './Sidebar/sidebar/sidebar.component';
import { UserImageComponent } from './Sidebar/user-image/user-image.component';
import { TakeFormComponent } from './take-form/take-form.component';
import { ViewCommunityComponent } from './view-community/view-community.component';
import { YourCommunityItemComponent } from './YourCommunities/your-community-item/your-community-item.component';
import { YourCommunityListComponent } from './YourCommunities/your-community-list/your-community-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NewFeedPageComponent } from './new-feed-page/new-feed-page.component';
import { NewSidebarComponent } from './new-sidebar/new-sidebar.component';
import { NewNavbarComponent } from './new-navbar/new-navbar.component';
import { MemberListComponent } from './member-list/member-list.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AskQuestionComponent } from './ask-question/ask-question.component';

@NgModule({
  declarations: [
    AppComponent,
    PieChartComponent,
    NavbarComponent,
    ConfirmationPopupComponent,
    CreateCommunityComponent,
    MultipleChoiceFormComponent,
    NumberQuestionFormComponent,
    RatingFormComponent,
    ShortAnswerFormComponent,
    CreateFormComponent,
    DescriptionSwitchButtonsComponent,
    FormButtonComponent,
    SwitchButtonsComponent,
    DiscussionItemComponent,
    DiscussionListComponent,
    FeedFormComponent,
    FeedListComponent,
    FeedPageComponent,
    MiniShowFormComponent,
    ShortAnswersComponent,
    StarArrayComponent,
    FeedbackComponent,
    ImageEditorComponent,
    LoginComponent,
    LoginPopupComponent,
    NetworkItemComponent,
    NetworkListComponent,
    ProfileComponent,
    ResourceListComponent,
    SearchPageComponent,
    QuestionComponent,
    SettingsComponent,
    ShareFormComponent,
    CommunityImageComponent,
    RightPanelComponent,
    SidebarComponent,
    UserImageComponent,
    TakeFormComponent,
    ViewCommunityComponent,
    YourCommunityItemComponent,
    YourCommunityListComponent,
    LandingPageComponent,
    NewFeedPageComponent,
    NewSidebarComponent,
    NewNavbarComponent,
    MemberListComponent,
    SignInComponent,
    AskQuestionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    routing,
    NgbModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    DragulaModule,
    TagInputModule,
    Ng2FlatpickrModule,
    AngularMultiSelectModule,
    NgForageModule,
    ShareButtonsModule.forRoot(),
    ShareButtonModule.forRoot(),
    ImageCropperModule,
    FormsModule
  ],
  providers: [
      NgbActiveModal,
      CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
