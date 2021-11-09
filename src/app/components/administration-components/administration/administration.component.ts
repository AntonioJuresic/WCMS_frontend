import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthorizationGuardService } from 'src/app/shared/services/authorization-guard.service';

@Component({
    selector: 'app-administration',
    templateUrl: './administration.component.html',
    styleUrls: ['./administration.component.scss'],
    providers: [AuthorizationGuardService]
})
export class AdministrationComponent implements OnInit {

    constructor(
        private titleService: Title,
        private authorizationGuardService: AuthorizationGuardService
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle("Administration Panel");

        this.authorizationGuardService.userNeedsToBeLogged(true);
        this.authorizationGuardService.userNeedsToBeAdmin();
    }

}
