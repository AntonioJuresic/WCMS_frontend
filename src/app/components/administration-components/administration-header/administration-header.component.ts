import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsiteHeader } from 'src/app/shared/models/websiteHeader';
import { WebsiteHeaderService } from 'src/app/shared/services/website-header.service';

@Component({
    selector: 'app-administration-header',
    templateUrl: './administration-header.component.html',
    styleUrls: ['./administration-header.component.scss']
})
export class AdministrationHeaderComponent implements OnInit {

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