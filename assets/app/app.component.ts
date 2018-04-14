import { Component, ViewContainerRef, ComponentFactoryResolver, ViewChild, ComponentRef } from '@angular/core';
import { HTMLElementUtil} from './HTMLUtilities';
import { Angulartics2Mixpanel } from 'angulartics2/mixpanel'

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(mp: Angulartics2Mixpanel) { }
}

