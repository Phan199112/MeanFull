import { Injectable } from '@angular/core';

let data = null;

@Injectable()
export class FormService {
    getData() {
        return data;
    }

    setData(received) {
        data = received;
    }
}