import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as $ from 'jquery';

@Component({
    selector: 'user-image',
    templateUrl: './user.image.component.html',
    styleUrls: ['./user.image.component.scss'],
})

export class UserImageComponent implements OnInit, AfterViewInit {
    @Input() data: Object;
    name: Array<string>;
    type: string;

    startingTime:any;

    ngOnInit() {
        this.startTime = Date.now();

        if (this.data && typeof this.data.name === "object") {
            this.type = 'network';
            this.name = this.data.name; 
        } else {
            this.type = 'users';
            this.name  = this.data.name.split(' ');
        }
    }

    ngAfterViewInit() {
        // Dynamically sets img width and text box of images to be equal to the width
        function setHeight() {            
            var usrImgWidth = $(".usrImg").first().width();
            if (usrImgWidth == 0) window.setTimeout(setHeight,200);
            $(".usrImg, .commImg").css({ height: usrImgWidth  });
            $(".imgTitle, .commText").css({ width: usrImgWidth });
        }

        window.setTimeout(setHeight,400);
        window.setTimeout(setHeight,1000);

        // Resize images when window resizes
        $(window).resize(function () {
            var usrImgWidth = $(".usrImg").first().width();
            $(".usrImg, .commImg").css({ height: usrImgWidth });
            $(".imgTitle, .commText").css({ width: usrImgWidth });
        });
    }

    clickedUser() {
        var startingTime = this.startingTime;

        window.mixpanel.track("Discovered User on Feed", {
            "timeElapsedFromInit": (Date.now() - startingTime) / 1000,
            "userLink": this.data.link,
            "name": this.data.name,
            "timestamp": Date.now()
        });
    }
}