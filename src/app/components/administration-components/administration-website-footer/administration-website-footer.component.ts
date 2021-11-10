import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsiteFooter } from 'src/app/shared/models/websiteFooter';
import { WebsiteFooterService } from 'src/app/shared/services/website-footer.service';

@Component({
  selector: 'app-administration-website-footer',
  templateUrl: './administration-website-footer.component.html',
  styleUrls: ['./administration-website-footer.component.scss']
})
export class AdministrationWebsiteFooterComponent implements OnInit {

    websiteFooter: WebsiteFooter = new WebsiteFooter;
    websiteFooterSubscription: Subscription = new Subscription;

    constructor(
        private websiteFooterService: WebsiteFooterService
    ) { }

    ngOnInit(): void {
        this.websiteFooterService.getWebsiteFooter();
        this.websiteFooterSubscription = this.websiteFooterService.websiteFooterBS
            .subscribe(
                res => {
                    this.websiteFooter = res;
                });
    }

    ngOnDestroy(): void {
        this.websiteFooterSubscription.unsubscribe();
    }
}