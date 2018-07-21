import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

let _groups = [];
let _categories: any = null;
let _callbacks = [];

@Injectable({
  providedIn: 'root'
})
export class MygroupsService {

    constructor(
        private http: Http,
    ) {
        this.refresh();
    }

    public getGroups() {
        return _groups;
    }

    public getCategories() {
        return _categories;
    }

    public getGroupById(groupId: any) {
        for (let i in _groups) {
            if (_groups[i].id === groupId) {
                return _groups[i];
            }
        }
        return null;
    }

    public getGroupIdByName(name: string) {
        for (let i in _groups) {
            if (_groups[i].title === name) {
                return _groups[i].id;
            }
        }
        return null;
    }

    // Subscribe to changes
    public onChange(callback: any) {
        if (_groups.length > 0) {
            callback({g: _groups, c: _categories});
        }
        _callbacks.push(callback);
    }

    public acknowledgeUserOrGroupChange() {
        this.refresh();
    }

    private refresh() {
        this.http.get('/group/mylist')
        .toPromise()
        .then(response => {
            const responseJson = response.json();

            _groups = responseJson.data;
            _categories = responseJson.categories;

            _callbacks.forEach(function (callback) {
                callback({g: _groups, c: _categories});
            });
        });
    }
}
