import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { WebsiteHead } from 'src/app/shared/models/websiteHead';
import { WebsiteHeadService } from 'src/app/shared/services/website-head.service';

@Component({
    selector: 'app-website-head',
    templateUrl: './website-head.component.html',
    styleUrls: ['./website-head.component.scss']
})
export class WebsiteHeadComponent implements OnInit, OnDestroy {

    websiteHead: WebsiteHead = new WebsiteHead;
    websiteHeadSubscription: Subscription = new Subscription;

    constructor(
        private websiteHeadService: WebsiteHeadService,
        private titleService: Title,
        private meta: Meta
    ) { }

    ngOnInit(): void {
        this.websiteHeadService.getWebsiteHead();

        this.websiteHeadSubscription = this.websiteHeadService.websiteHeadBS
            .subscribe(
                res => {
                    this.websiteHead = res;

                    if (this.websiteHead.title != undefined) {
                        this.updateTitle();
                        this.updateMeta();
                    }
                });
    }

    updateTitle() {
        this.titleService.setTitle(this.websiteHead.title!.valueOf());
    }

    updateMeta() {
        this.meta.updateTag({
            name: 'charset',
            content: this.websiteHead.charset!.valueOf()
        });

        this.meta.updateTag({
            name: 'keywords',
            content: this.websiteHead.keywords!.valueOf()
        });

        this.meta.updateTag({
            name: 'description',
            content: this.websiteHead.description!.valueOf()
        });

        this.meta.updateTag({
            name: 'author',
            content: this.websiteHead.author!.valueOf()
        });

        this.meta.updateTag({
            name: 'viewport',
            content: this.websiteHead.viewport!.valueOf()
        });
    }


    ngOnDestroy(): void {
        this.websiteHeadSubscription.unsubscribe();
    }
}