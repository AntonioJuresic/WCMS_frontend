import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WebsiteFooter } from '../models/websiteFooter';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class WebsiteFooterService {

    websiteFooter: WebsiteFooter = new WebsiteFooter;
    websiteFooterBS: BehaviorSubject<WebsiteFooter> = new BehaviorSubject<WebsiteFooter>(new WebsiteFooter);

    successChangingWebsiteFooterBS: BehaviorSubject<String | undefined> = new BehaviorSubject<String | undefined>(undefined);
    failureChangingWebsiteFooterBS: BehaviorSubject<String | undefined> = new BehaviorSubject<String | undefined>(undefined);

    constructor(
        private dataService: DataService
    ) { }

    getWebsiteFooter() {
        this.dataService.getWebsiteFooter()
            .subscribe(
                (res: {
                    status: Number,
                    selectedWebsiteFooter: WebsiteFooter[]
                }) => {
                    this.websiteFooter = res.selectedWebsiteFooter[0];
                    this.websiteFooterBS.next(this.websiteFooter);
                });
    }

    postWebsiteFooter(websiteFooter: WebsiteFooter) {
        this.dataService.postWebsiteFooter(websiteFooter)
            .subscribe(
                (res: {
                    status: Number,
                    selectedWebsiteFooter: WebsiteFooter[]
                }) => {
                    this.websiteFooter = res.selectedWebsiteFooter[0];
                    this.websiteFooterBS.next(this.websiteFooter);

                    this.successChangingWebsiteFooterBS.next("Success");
                    this.failureChangingWebsiteFooterBS.next(undefined);
                },
                
                (error : any) => {
                    this.successChangingWebsiteFooterBS.next(undefined);
                    this.failureChangingWebsiteFooterBS.next("Error");
                });
    }

    putWebsiteFooter(websiteFooter: WebsiteFooter) {
        this.dataService.putWebsiteFooter(websiteFooter)
            .subscribe(
                (res: {
                    status: Number,
                    selectedWebsiteFooter: WebsiteFooter[]
                }) => {
                    this.websiteFooter = res.selectedWebsiteFooter[0];
                    this.websiteFooterBS.next(this.websiteFooter);

                    this.successChangingWebsiteFooterBS.next("Success");
                    this.failureChangingWebsiteFooterBS.next(undefined);
                },
                
                (error : any) => {
                    this.successChangingWebsiteFooterBS.next(undefined);
                    this.failureChangingWebsiteFooterBS.next("Error");
                });
    }
}
