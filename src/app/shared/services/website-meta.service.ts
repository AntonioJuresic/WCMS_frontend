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

    constructor(
        private dataService: DataService
    ) { }

    getWebsiteMeta() {
        this.dataService.getWebsiteMeta()
            .subscribe(
                (res: {
                    status: Number,
                    selectedHead: WebsiteMeta[]
                }) => {
                    this.websiteMeta = res.selectedHead[0];
                    this.websiteMetaBS.next(this.websiteMeta);
                });
    }
}
