import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss']


})
export class PopupComponent {


    constructor() {
    }

    closePopup(): void {
        AppComponent.PopupControler.close();
    }
    mousedown(e: MouseEvent) {
        AppComponent.PopupControler.StartDragAt(e.x, e.y);
    }
    dragging(e: DragEvent): void {
        e.preventDefault;
        if (e.x > 0 && e.y > 0)
            AppComponent.PopupControler.moveTo(e.clientX, e.clientY);

    }
}