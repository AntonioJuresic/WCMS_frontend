import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsiteMeta } from 'src/app/shared/models/websiteMeta';
import { WebsiteMetaService } from 'src/app/shared/services/website-meta.service';

@Component({
    selector: 'app-administration-meta',
    templateUrl: './administration-meta.component.html',
    styleUrls: ['./administration-meta.component.scss']
})
export class AdministrationMetaComponent implements OnInit, OnDestroy {

    websiteMeta: WebsiteMeta = new WebsiteMeta;
    websiteMetaSubscription: Subscription = new Subscription;

    editMode: Boolean = false;

    constructor(
        private websiteMetaService: WebsiteMetaService
    ) { }

    ngOnInit(): void {
        this.websiteMetaService.getWebsiteMeta();
        this.websiteMetaSubscription = this.websiteMetaService.websiteMetaBS
            .subscribe(
                res => {
                    this.websiteMeta = res;
                });
    }

    openEditor(websiteMeta?: WebsiteMeta) {
        this.editMode = true;
    }

    closeEditor(boolean: Boolean) {
        this.editMode = boolean;
    }

    ngOnDestroy(): void {
        this.websiteMetaSubscription.unsubscribe();
    }

}
