import {RouterModule, Routes} from '@angular/router';

import {CreateFormComponent} from './create-form/createForm.component';
import {ShareFormComponent} from './share-form/share-form.component';
import {TakeFormComponent} from './take-form/take-form.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {SettingsComponent} from './settings/settings.component';
import {CreateCommunityComponent} from './create-community/create-community.component';
import {ViewCommunityComponent} from './view-community/view-community.component';
import {FeedPageComponent} from './feed-page/feed-page.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {SearchPageComponent} from './search-page/search-page.component';

const APP_ROUTES: Routes = [
    // {path: 'ng6index.html', component: LandingPageComponent, pathMatch: 'full'},
    {path: '', component: LandingPageComponent, pathMatch: 'full'},
    {path: 'createForm', component: CreateFormComponent},
    {path: 'shareForm', component: ShareFormComponent},
    {path: 'takeForm/:id', component: TakeFormComponent},
    {path: 'feed', component: FeedPageComponent},
    {path: 'users/login', component: LoginComponent},
    {path: 'profile/:id', component: ProfileComponent},
    {path: 'profile/:id/:subsection', component: ProfileComponent},
    {path: 'settings', component: SettingsComponent},
    {path: 'createGroup', component: CreateCommunityComponent},
    {path: 'group/:id', component: ViewCommunityComponent},
    {path: 'searchresults', component: SearchPageComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
