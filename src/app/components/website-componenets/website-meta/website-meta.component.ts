import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { WebsiteMeta } from 'src/app/shared/models/websiteMeta';
import { WebsiteMetaService } from 'src/app/shared/services/website-meta.service';

@Component({
    selector: 'app-website-meta',
    templateUrl: './website-meta.component.html',
    styleUrls: ['./website-meta.component.scss']
})
export class WebsiteMetaComponent implements OnInit, OnDestroy {

    websiteMeta: WebsiteMeta = new WebsiteMeta;
    websiteMetaSubscription: Subscription = new Subscription;

    constructor(
        private WebsiteMetaService: WebsiteMetaService,
        private titleService: Title,
        private meta: Meta
    ) { }

    ngOnInit(): void {
        this.WebsiteMetaService.getWebsiteMeta();

        this.websiteMetaSubscription = this.WebsiteMetaService.websiteMetaBS
            .subscribe(
                res => {
                    this.websiteMeta = res;

                    if (this.websiteMeta.title != undefined) {
                        this.updateTitle();
                        this.updateMeta();
                    }
                });
    }

    updateTitle() {
        this.titleService.setTitle(this.websiteMeta.title!.valueOf());
    }

    updateMeta() {
        this.meta.updateTag({
            name: 'charset',
            content: this.websiteMeta.charset!.valueOf()
        });

        this.meta.updateTag({
            name: 'keywords',
            content: this.websiteMeta.keywords!.valueOf()
        });

        this.meta.updateTag({
            name: 'description',
            content: this.websiteMeta.description!.valueOf()
        });

        this.meta.updateTag({
            name: 'author',
            content: this.websiteMeta.author!.valueOf()
        });

        this.meta.updateTag({
            name: 'viewport',
            content: this.websiteMeta.viewport!.valueOf()
        });
    }


    ngOnDestroy(): void {
        this.websiteMetaSubscription.unsubscribe();
    }
}