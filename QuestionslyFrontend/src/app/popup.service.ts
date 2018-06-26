import { Injectable } from '@angular/core';

let link = null;

@Injectable()
export class PopupService {
    getLink() {
        return link;
    }

    setLink(received) {
        link = received;
    }
}
