import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, Subscription } from 'rxjs';
import { WebsiteInfo } from 'src/app/shared/models/websiteInfo';
import { WebsiteInfoService } from 'src/app/shared/services/website-info.service';

@Component({
    selector: 'app-website-info',
    templateUrl: './website-info.component.html',
    styleUrls: ['./website-info.component.scss']
})
export class WebsiteInfoComponent implements OnInit, OnDestroy {

    websiteInfo: WebsiteInfo = new WebsiteInfo
    websiteInfoSubscription: Subscription = new Subscription;

    constructor(
        private websiteInfoService: WebsiteInfoService,
        private titleService: Title
    ) { }

    ngOnInit(): void {
        this.websiteInfoService.getWebsiteInfo();

        this.websiteInfoSubscription = this.websiteInfoService.websiteInfoBS
            .subscribe(
                res => {
                    this.websiteInfo = res;

                    if (this.websiteInfo.title != undefined) {
                        this.titleService.setTitle(this.websiteInfo.title!.valueOf());
                    }
                });
    }

    ngOnDestroy(): void {
        this.websiteInfoSubscription.unsubscribe();
    }

}
