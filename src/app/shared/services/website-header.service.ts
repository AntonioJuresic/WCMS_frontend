import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WebsiteHeader } from '../models/websiteHeader';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class WebsiteHeaderService {

    websiteHeader: WebsiteHeader = new WebsiteHeader;
    websiteHeaderBS: BehaviorSubject<WebsiteHeader> = new BehaviorSubject<WebsiteHeader>(new WebsiteHeader);

    successChangingWebsiteHeaderBS: BehaviorSubject<String | undefined> = new BehaviorSubject<String | undefined>(undefined);
    failureChangingWebsiteHeaderBS: BehaviorSubject<String | undefined> = new BehaviorSubject<String | undefined>(undefined);

    constructor(
        private dataService: DataService
    ) { }

    getWebsiteHeader() {
        this.dataService.getWebsiteHeader()
            .subscribe(
                (res: {
                    status: Number,
                    selectedHeader: WebsiteHeader[]
                }) => {
                    this.websiteHeader = res.selectedHeader[0];
                    this.websiteHeaderBS.next(this.websiteHeader);
                });
    }

    postWebsiteHeader(websiteHeader: WebsiteHeader) {
        this.dataService.postWebsiteHeader(websiteHeader)
            .subscribe(
                (res: {
                    status: Number,
                    selectedMeta: WebsiteHeader[]
                }) => {
                    this.websiteHeader = res.selectedMeta[0];
                    this.websiteHeaderBS.next(this.websiteHeader);

                    this.successChangingWebsiteHeaderBS.next("Success");
                    this.failureChangingWebsiteHeaderBS.next(undefined);
                },
                
                (error : any) => {
                    this.successChangingWebsiteHeaderBS.next(undefined);
                    this.failureChangingWebsiteHeaderBS.next("Error");
                });
    }

    putWebsiteHeader(websiteHeader: WebsiteHeader) {
        this.dataService.putWebsiteHeader(websiteHeader)
            .subscribe(
                (res: {
                    status: Number,
                    selectedMeta: WebsiteHeader[]
                }) => {
                    this.websiteHeader = res.selectedMeta[0];
                    this.websiteHeaderBS.next(this.websiteHeader);

                    this.successChangingWebsiteHeaderBS.next("Success");
                    this.failureChangingWebsiteHeaderBS.next(undefined);
                },
                
                (error : any) => {
                    this.successChangingWebsiteHeaderBS.next(undefined);
                    this.failureChangingWebsiteHeaderBS.next("Error");
                });
    }
}
