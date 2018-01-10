import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

let data: any = null;
let checkedLogin: boolean = false;
let loggedin: boolean = false;

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
    }

    getLoggedin() {
        return loggedin;
    }

    afterLoginCheck() {
        return new Promise((resolve, reject) => {
            if (!checkedLogin) {
                this.http.get('/users/loggedin').toPromise()
                    .then(res => {
                        checkedLogin = true;
                        data = res.json();
                        loggedin = data != null;
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            } else {
                resolve(data);
            }
        })
            .catch(function() {
                data = null;
                checkedLogin = false;
                loggedin = false;
            });
    }

    afterLoginReload() {
        return new Promise((resolve, reject) => {
            this.http.get('/users/loggedin').toPromise()
                .then(res => {
                    checkedLogin = true;
                    data = res.json();
                    loggedin = data != null;
                    resolve(data);
                })
                .catch(error => {
                    alert("Error checking if logged in: " + error);
                    reject(error);
                });
        })
            .catch(function() {
                data = null;
                checkedLogin = false;
                loggedin = false;
            });
    }
}