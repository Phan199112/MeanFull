import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

let callbacksForLogin: any[] = [];

@Injectable({
     providedIn: 'root'
})
export class UserService {

    constructor(private http: Http) {}

    public getUser() {
        return window['USER_LOGIN_STATE'];
    }

    public getRole() {
        return this.getUser().role;
    }

    // Deprecated - no async stuff needed now
    afterLoginCheck() {
        return (new Promise((resolve, reject) => {
            resolve(window['USER_LOGIN_STATE']);
        }) as any);
    }

    // We just made a successful AJAX request to login; we should notify any subscribers who are waiting to be logged in
    public acknowledgeLogin(userData) {
        window['USER_LOGIN_STATE'] = userData;
        callbacksForLogin.forEach(function (callback) {
            callback(this.getUser());
        }.bind(this));
    }

    // Deprecated - use onChange instead
    public listenForLogin(callback) {
        callbacksForLogin.push(callback);
    }

    public onChange(callback) {
        callbacksForLogin.push(callback);
        callback(this.getUser());
    }
}
