import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WebsiteMeta } from '../models/websiteMeta';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class WebsiteMetaService {

    websiteMeta: WebsiteMeta = new WebsiteMeta;
    websiteMetaBS: BehaviorSubject<WebsiteMeta> = new BehaviorSubject<WebsiteMeta>(new WebsiteMeta);

    successChangingWebsiteMetaBS: BehaviorSubject<String | undefined> = new BehaviorSubject<String | undefined>(undefined);
    failureChangingWebsiteMetaBS: BehaviorSubject<String | undefined> = new BehaviorSubject<String | undefined>(undefined);

    constructor(
        private dataService: DataService
    ) { }

    getWebsiteMeta() {
        this.dataService.getWebsiteMeta()
            .subscribe(
                (res: {
                    status: Number,
                    selectedMeta: WebsiteMeta[]
                }) => {
                    this.websiteMeta = res.selectedMeta[0];
                    this.websiteMetaBS.next(this.websiteMeta);
                });
    }

    postWebsiteMeta(websiteMeta: FormData) {
        this.dataService.postWebsiteMeta(websiteMeta)
            .subscribe(
                (res: {
                    status: Number,
                    selectedMeta: WebsiteMeta[]
                }) => {
                    this.websiteMeta = res.selectedMeta[0];
                    this.websiteMetaBS.next(this.websiteMeta);

                    this.successChangingWebsiteMetaBS.next("Success");
                    this.failureChangingWebsiteMetaBS.next(undefined);
                },
                
                (error : any) => {
                    this.successChangingWebsiteMetaBS.next(undefined);
                    this.failureChangingWebsiteMetaBS.next("Error");
                });
    }

    putWebsiteMeta(websiteMeta: FormData) {
        this.dataService.putWebsiteMeta(websiteMeta)
            .subscribe(
                (res: {
                    status: Number,
                    selectedMeta: WebsiteMeta[]
                }) => {
                    this.websiteMeta = res.selectedMeta[0];
                    this.websiteMetaBS.next(this.websiteMeta);

                    this.successChangingWebsiteMetaBS.next("Success");
                    this.failureChangingWebsiteMetaBS.next(undefined);
                },
                
                (error : any) => {
                    this.successChangingWebsiteMetaBS.next(undefined);
                    this.failureChangingWebsiteMetaBS.next("Error");
                });
    }
}
