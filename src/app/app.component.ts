import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PingService } from './shared/services/ping.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'frontend';

    constructor(
        pingService: PingService
    ) { }
}
