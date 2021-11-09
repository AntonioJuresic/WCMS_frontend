import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { WebsiteHeader } from 'src/app/shared/models/websiteHeader';
import { WebsiteHeaderService } from 'src/app/shared/services/website-header.service';

@Component({
  selector: 'app-website-header',
  templateUrl: './website-header.component.html',
  styleUrls: ['./website-header.component.scss']
})
export class WebsiteHeaderComponent implements OnInit {

    websiteHeader: WebsiteHeader = new WebsiteHeader;
    websiteHeaderSubscription: Subscription = new Subscription;

    constructor(
        private websiteHeaderService: WebsiteHeaderService
    ) { }

    ngOnInit(): void {
        this.websiteHeaderService.getWebsiteHeader();

        this.websiteHeaderSubscription = this.websiteHeaderService.websiteHeaderBS
            .subscribe(
                res => {
                    this.websiteHeader = res;
                });
    }

    ngOnDestroy(): void {
        this.websiteHeaderSubscription.unsubscribe();
    }
}