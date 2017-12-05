import {NgModule } from '@angular/core';
import {BrowserModule } from '@angular/platform-browser';
import {HttpModule } from "@angular/http";
import {HttpClientModule } from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {DragulaModule} from "ng2-dragula";
import {TagInputModule } from 'ngx-chips';
import {Ng2FlatpickrComponent} from 'ng2-flatpickr/ng2-flatpickr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent } from "./app.component";
import {routing} from "./app.routing";
import {CreateFormComponent} from "./createForm/createForm.component";
import {ShowFormComponent} from "./showForm/showForm.component";
import {PreviewFormComponent} from "./previewForm/previewForm.component";
import {ShareFormComponent} from "./shareForm/shareForm.component";
import {TakeFormComponent} from "./takeForm/takeForm.component";
import {FocusDirective} from "./focus.directive";
import {NavbarComponent} from "./navbar/navbar.component";
import {FeedFormComponent} from "./feed/feed.form.component";
import {FeedListComponent} from "./feed/feed.list.component";
import {LoginComponent} from "./login/login.component";
import {MiniShowFormComponent} from "./feed/miniShowForm.component";
import {ProfileComponent} from "./profile/profile.component";
import {TagListComponent} from "./tagsContainer/tag.list.component";
import {TagComponent} from "./tagsContainer/tag.component";
import {CommunityComponent} from "./communityContainer/community.component";
import {CommunityListComponent} from "./communityContainer/community.list.component";
import {SettingsComponent} from './settings/settings.component';
import {SettingsQuestionComponent} from './settings/question.component';
import {ToolTipModule} from 'angular2-tooltip';
import {CreateCommunityComponent} from './createCommunity/createCommunity.component';
import {ViewCommunityComponent} from "./viewCommunity/viewCommunity.component";
import {FeedPageComponent } from "./feed/feed.page.component";
import {YourFormComponent } from "./yourForms/yourform.component";
import {YourFormListComponent } from "./yourForms/yourform.list.component";
import {FeedbackComponent } from "./feedback/feedback.component";
import {NguiAutoCompleteModule } from '@ngui/auto-complete';
import {TagBannerListComponent} from "./tagsBanner/tagbanner.list.component";
import {DiscussionComponent} from "./discussion/discussion.component";
import {DiscussionListComponent} from "./discussion/discussion.list.component";
import {BarChartComponent} from "./charts/bar.chart.component";
import {DoughnutChartComponent} from "./charts/doughnut.chart.component";
import {ChartsModule} from 'ng2-charts';
import {NetworkComponent} from "./networkContainer/network.component";
import {NetworkListComponent} from "./networkContainer/network.list.component";
import {PopupComponent} from './popup/popup.component';
import {PopupShareComponent} from './popup/popup.share.component';
import {YourCommunityListComponent} from './yourCommunities/yourcomm.list.component';
import {YourCommunityComponent} from './yourCommunities/yourcomm.component';
import {YourFriendsListComponent} from './yourFriends/yourfriends.list.component';
import {YourFriendsComponent} from './yourFriends/yourfriends.component';
import {PopupInviteCommComponent} from "./popup/popup.invitecomm.component";

@NgModule({
    declarations: [
        Ng2FlatpickrComponent,
        AppComponent,
        CreateFormComponent,
        ShowFormComponent,
        PreviewFormComponent,
        ShareFormComponent,
        TakeFormComponent,
        FocusDirective,
        NavbarComponent,
        FeedFormComponent,
        FeedListComponent,
        LoginComponent,
        MiniShowFormComponent,
        BarChartComponent,
        DoughnutChartComponent,
        ProfileComponent,
        TagListComponent,
        TagComponent,
        SettingsComponent,
        SettingsQuestionComponent,
        CreateCommunityComponent,
        ViewCommunityComponent,
        FeedPageComponent,
        CommunityComponent,
        CommunityListComponent,
        YourFormComponent,
        YourFormListComponent,
        FeedbackComponent,
        NetworkComponent,
        NetworkListComponent,
        TagBannerListComponent,
        DiscussionComponent,
        DiscussionListComponent,
        PopupComponent,
        PopupShareComponent,
        YourCommunityListComponent,
        YourCommunityComponent,
        YourFriendsListComponent,
        YourFriendsComponent,
        PopupInviteCommComponent
    ],
    imports: [
        // vendor //
        DragulaModule,
        TagInputModule,
        NgbModule.forRoot(),
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        routing,
        ChartsModule,
        ToolTipModule,
        NguiAutoCompleteModule,
        RouterModule.forRoot([
            {
                //Register here to stop error "no factory resolver for PopupComponent". It is not used as routing
                path: 'PopupComponent',
                component: PopupComponent,

            },
            {
                //Register here to stop error "no factory resolver for PopupComponent". It is not used as routing
                path: 'PopupShareComponent',
                component: PopupShareComponent,

            },
            {
                //Register here to stop error "no factory resolver for PopupComponent". It is not used as routing
                path: 'PopupInviteCommComponent',
                component: PopupInviteCommComponent,

            }
        ])
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}