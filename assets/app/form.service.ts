import { Injectable } from '@angular/core';
import {NgForage, NgForageConfig} from "ngforage";

let data = null;

@Injectable()
export class FormService {
    constructor(private readonly ngf: NgForage) {
    }

    getData() {
        return data;
    }

    setData(received) {
        data = received;
    }

    async getPersistedData() {
        let data = await this.ngf.getItem('form');
        return data;
    }

    async setPersistedData(received) {
        await this.ngf.setItem('form', received);
    }
}