import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { WebsiteInfo } from 'src/app/shared/models/websiteInfo';
import { WebsiteInfoService } from 'src/app/shared/services/website-info.service';

@Component({
    selector: 'app-administration-website-info',
    templateUrl: './administration-website-info.component.html',
    styleUrls: ['./administration-website-info.component.scss']
})
export class AdministrationWebsiteInfoComponent implements OnInit, OnDestroy {

    websiteInfo: WebsiteInfo = new WebsiteInfo;
    websiteInfoSubscription: Subscription = new Subscription;

    editMode: Boolean = false;

    constructor(
        private websiteInfoService: WebsiteInfoService
    ) { }

    ngOnInit(): void {
        this.websiteInfoService.getWebsiteInfo();
        this.websiteInfoSubscription = this.websiteInfoService.websiteInfoBS
            .subscribe(
                res => {
                    this.websiteInfo = res;
                });
    }

    openEditor(websiteInfo?: WebsiteInfo) {
        this.editMode = true;
    }

    closeEditor(boolean: Boolean) {
        this.editMode = boolean;
    }

    ngOnDestroy(): void {
        this.websiteInfoSubscription.unsubscribe();
    }
}