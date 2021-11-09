import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { WebsiteMeta } from 'src/app/shared/models/websiteMeta';
import { WebsiteMetaService } from 'src/app/shared/services/website-meta.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-website-meta',
    templateUrl: './website-meta.component.html',
    styleUrls: ['./website-meta.component.scss']
})
export class WebsiteMetaComponent implements OnInit, OnDestroy {

    websiteMeta: WebsiteMeta = new WebsiteMeta;
    websiteMetaSubscription: Subscription = new Subscription;

    // accessing favicon link tag
    favIcon: HTMLLinkElement = document.querySelector('#appIcon')!;

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

                    this.websiteMeta.imagePath = environment.SERVER_URL + this.websiteMeta.imagePath?.substring(2);

                    if (this.websiteMeta.title != undefined) {
                        this.updateTitle();
                        this.updateMeta();
                        this.changeIcon();
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

    changeIcon() {
        this.favIcon.href = this.websiteMeta.imagePath.valueOf();
    }

    ngOnDestroy(): void {
        this.websiteMetaSubscription.unsubscribe();
    }
}