import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

let callbacksForLogin: any[] = [];

@Injectable({
     providedIn: 'root'
})
export class UserService {

    constructor(private http: Http) {}

    getUser() {
        return window['USER_LOGIN_STATE'];
    }

    // Deprecated - no async stuff needed now
    afterLoginCheck() {
        return (new Promise((resolve, reject) => {
            resolve(window['USER_LOGIN_STATE']);
        }) as any);
    }

    // We just made a successful AJAX request to login; we should notify any subscribers who are waiting to be logged in
    acknowledgeLogin(userData) {
        window['USER_LOGIN_STATE'] = userData;
        callbacksForLogin.forEach(function (callback) {
            callback();
        });
    }

    listenForLogin(callback) {
        callbacksForLogin.push(callback);
    }
}
