import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

    constructor(
        private titleService: Title
    ) {
        this.titleService.setTitle("LOREM IPSUM");
    }

    ngOnInit(): void {
    }

}
