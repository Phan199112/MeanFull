import {RouterModule, Routes} from "@angular/router";

import {PieChartComponent} from "./pie-chart/pie-chart.component";


/*
import {CreateFormComponent} from "./createForm/createForm.component";
import {PreviewFormComponent} from "./previewForm/previewForm.component";
import {ShareFormComponent} from "./shareForm/shareForm.component";
import {TakeFormComponent} from "./takeForm/takeForm.component";
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from "./profile/profile.component";
import {SettingsComponent} from "./settings/settings.component";
import {CreateCommunityComponent} from "./createCommunity/createCommunity.component";
import {ViewCommunityComponent} from "./viewCommunity/viewCommunity.component";
import {FeedPageComponent} from "./feed/feed.page.component";
import {SearchPageComponent} from "./search/search.page.component";
*/
const APP_ROUTES: Routes = [
    {path: '', component: PieChartComponent},
    {path: 'ng6index.html', component: PieChartComponent}
/*
    {path: '', component: FeedPageComponent, pathMatch: 'full'},
    {path: 'createForm', component: CreateFormComponent},
    {path: 'previewForm', component: PreviewFormComponent},
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
    */
];

export const routing = RouterModule.forRoot(APP_ROUTES);