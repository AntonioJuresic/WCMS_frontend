import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WebsiteHead } from '../models/websiteHead';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class WebsiteHeadService {

    websiteHead: WebsiteHead = new WebsiteHead;
    websiteHeadBS: BehaviorSubject<WebsiteHead> = new BehaviorSubject<WebsiteHead>(new WebsiteHead);

    constructor(
        private dataService: DataService
    ) { }

    getWebsiteHead() {
        this.dataService.getWebsiteHead()
            .subscribe(
                (res: {
                    status: Number,
                    selectedHead: WebsiteHead[]
                }) => {
                    this.websiteHead = res.selectedHead[0];
                    this.websiteHeadBS.next(this.websiteHead);
                });
    }
}
