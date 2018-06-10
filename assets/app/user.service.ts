import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

let data: any = null;
let checkedLogin: boolean = false;
let loggedin: boolean = false;
let loginCheckPromise: Promise = null;
let callbacksForLogin: Array = [];

@Injectable()
export class UserService {

    constructor(private http: Http) {}

    getData() {
        return data;
    }

    setData(received) {
        data = received;
    }

    clearLogin() {
        data = null;
        checkedLogin = false;
        loggedin = false;
        loginCheckPromise = null;
    }

    afterLoginCheck() {
        if (checkedLogin) {
            return new Promise((resolve, reject) => {
                resolve(data);
            });
        }

        // We are already checking /users/loggedin; we already have a promise
        if (loginCheckPromise) {
            return loginCheckPromise;
        }

        return loginCheckPromise = new Promise((resolve, reject) => {
            this.http.get('/users/loggedin').toPromise()
                .then(res => {
                    checkedLogin = true;
                    data = res.json();
                    loggedin = data != 0;
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        })
            .catch(function() {
                data = null;
                checkedLogin = false;
                loggedin = false;
                loginCheckPromise = null;

                // Indicate that the user is not logged in
                return 0;
            });
    }

    acknowledgeLogin() {
        checkedLogin = false;
        loginCheckPromise = null;
        callbacksForLogin.forEach(function (callback) {
            callback();
        });
    }

    listenForLogin(callback) {
        callbacksForLogin.push(callback);
    }
}
