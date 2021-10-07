import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WebsiteInfo } from '../models/websiteInfo';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class WebsiteInfoService {

    websiteInfo: WebsiteInfo = new WebsiteInfo;
    websiteInfoBehaviorSubject: BehaviorSubject<WebsiteInfo> = new BehaviorSubject<WebsiteInfo>(new WebsiteInfo);

    constructor(
        private dataService: DataService
    ) { }

    getWebsiteInfo() {
        this.dataService.getWebsiteInfo()
            .subscribe((res: { status: Number, selectedWebsiteInfo: WebsiteInfo[] }) => {
                this.websiteInfo = res.selectedWebsiteInfo[0];
                this.websiteInfoBehaviorSubject.next(this.websiteInfo);
            });

        return this.websiteInfoBehaviorSubject;
    }

    postWebsiteInfo(newWebsiteInfo: WebsiteInfo) {
        this.dataService.postWebsiteInfo(newWebsiteInfo)
            .subscribe((res: { status: Number, selectedWebsiteInfo: WebsiteInfo[] }) => {
                this.websiteInfo = res.selectedWebsiteInfo[0];
                this.websiteInfoBehaviorSubject.next(this.websiteInfo);
            });

        return this.websiteInfoBehaviorSubject;
    }

    putWebsiteInfo(updatedWebsiteInfo: WebsiteInfo) {
        this.dataService.putWebsiteInfo(updatedWebsiteInfo)
            .subscribe((res: { status: Number, selectedWebsiteInfo: WebsiteInfo[] }) => {
                this.websiteInfo = res.selectedWebsiteInfo[0];
                this.websiteInfoBehaviorSubject.next(this.websiteInfo);
            });

        return this.websiteInfoBehaviorSubject;
    }
}
