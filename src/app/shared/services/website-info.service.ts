import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WebsiteInfo } from '../models/websiteInfo';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class WebsiteInfoService {

    websiteInfo: WebsiteInfo = new WebsiteInfo;
    websiteInfoBS: BehaviorSubject<WebsiteInfo> = new BehaviorSubject<WebsiteInfo>(new WebsiteInfo);

    constructor(
        private dataService: DataService
    ) { }

    getWebsiteInfo() {
        this.dataService.getWebsiteInfo()
            .subscribe(
                (res: {
                    status: Number,
                    selectedWebsiteInfo: WebsiteInfo[]
                }) => {
                    this.websiteInfo = res.selectedWebsiteInfo[0];
                    this.websiteInfoBS.next(this.websiteInfo);
                });
    }

    postWebsiteInfo(newWebsiteInfo: WebsiteInfo) {
        this.dataService.postWebsiteInfo(newWebsiteInfo)
            .subscribe(
                (res: {
                    status: Number,
                    selectedWebsiteInfo: WebsiteInfo[]
                }) => {
                    this.websiteInfo = res.selectedWebsiteInfo[0];
                    this.websiteInfoBS.next(this.websiteInfo);
                });
    }

    putWebsiteInfo(updatedWebsiteInfo: WebsiteInfo) {
        this.dataService.putWebsiteInfo(updatedWebsiteInfo)
            .subscribe(
                (res: {
                    status: Number,
                    selectedWebsiteInfo: WebsiteInfo[]
                }) => {
                    this.websiteInfo = res.selectedWebsiteInfo[0];
                    this.websiteInfoBS.next(this.websiteInfo);
                });
    }
}
