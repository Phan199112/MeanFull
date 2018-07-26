import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

let _org: any = null;
let _callbacks = [];
let _oneTimeCallbacks = [];

@Injectable({
    providedIn: 'root'
})
export class OrganizationService {

    constructor(
        private http: Http,
    ) {
        this.refresh();
    }

    public getOrgName() {
        return _org ? _org.name : '';
    }

    public getOrgId() {
        return _org ? _org.id : '';
    }

    public onReady(callback: any) {
        if (_org) {
            callback(_org);
        } else {
            _oneTimeCallbacks.push(callback);
        }
    }

    public onChange(callback: any) {
        if (_org) {
            callback(_org);
        }
        _callbacks.push(callback);
    }

    public acknowledgeUserOrGroupChange() {
        this.refresh();
    }

    private refresh() {
        this.http.get('/organizations/mine')
            .toPromise()
            .then(response => {
                const responseJson = response.json();

                _org = responseJson.organization;

                _callbacks.forEach(function (callback) {
                    callback(_org);
                });
                _oneTimeCallbacks.forEach(function (callback) {
                    callback(_org);
                });
                _oneTimeCallbacks = [];
            });
    }
}
