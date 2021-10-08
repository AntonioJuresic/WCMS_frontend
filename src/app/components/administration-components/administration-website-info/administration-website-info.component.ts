import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { WebsiteInfo } from 'src/app/shared/models/websiteInfo';
import { WebsiteInfoService } from 'src/app/shared/services/website-info.service';

@Component({
  selector: 'app-administration-website-info',
  templateUrl: './administration-website-info.component.html',
  styleUrls: ['./administration-website-info.component.scss']
})
export class AdministrationWebsiteInfoComponent implements OnInit {
  
    websiteInfo: WebsiteInfo = new WebsiteInfo;
    websiteInfoBehaviourSubject: BehaviorSubject<WebsiteInfo[]> = new BehaviorSubject<WebsiteInfo[]>([]);
    websiteInfoSubscription: Subscription = new Subscription;

    editMode : Boolean = false;

    constructor(
        private websiteInfoService: WebsiteInfoService
    ) { }

    ngOnInit(): void {
        /*this.websiteInfoBehaviourSubject = this.categoryService.getCategories();
        this.websiteInfoSubscription = this.websiteInfoBehaviourSubject
            .subscribe(res => {
                this.websiteInfo = res[0];
            });*/
    }

    openEditor(WebsiteInfo? : WebsiteInfo) {
        this.editMode = true;
    }

    closeEditor(boolean: Boolean) {
        this.editMode = boolean;
    }
}