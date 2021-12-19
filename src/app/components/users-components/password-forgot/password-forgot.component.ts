import { Component, OnInit } from '@angular/core';
import { AuthorizationGuardService } from 'src/app/shared/services/authorization-guard.service';

@Component({
    selector: 'app-password-forgot',
    templateUrl: './password-forgot.component.html',
    styleUrls: ['./password-forgot.component.scss']
})
export class PasswordForgotComponent implements OnInit{

    emailSent: Boolean = new Boolean(false);
    emailAdrress: String = new String;

    constructor(
        private authorizationGuardService: AuthorizationGuardService
        ) { }

    ngOnInit(): void {
        this.authorizationGuardService.userNeedsToBeLogged(false);
    }

    successSendingEmail(emailSent: Boolean) {
        this.emailSent = emailSent;
    }

    getEmailAdrress(emailAdrress: String) {
        this.emailAdrress = emailAdrress;
    }

}
