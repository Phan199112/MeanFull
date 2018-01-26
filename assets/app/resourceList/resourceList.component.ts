import { Component, Input } from '@angular/core';
import { Http } from "@angular/http";

@Component({
  selector: 'resource-list',
  templateUrl: './resourceList.component.html',
  styleUrls: ['./resourceList.component.scss']
})
export class ResourceListComponent {
  @Input() resource: string;
  @Input() list: any[] = [];
  
  constructor(
    private http: Http 
  ) {}

  pic(item) {
    if (item.pic) {
      return item.pic;
    } else {
      switch (this.resource) {
        case "user":
          return `/images/${item.gender}.png`;
        case "community":
          return "/images/question.jpg";
      }
    }
  }

  link(item) {
    switch (this.resource) {
      case "user":
        return `/profile/${item.id}`;
      case "community":
        return `/community/${item.id}`;      
    }      
  }
}