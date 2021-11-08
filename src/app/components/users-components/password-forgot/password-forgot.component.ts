import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-password-forgot',
    templateUrl: './password-forgot.component.html',
    styleUrls: ['./password-forgot.component.scss']
})
export class PasswordForgotComponent {

    emailSent: Boolean = new Boolean(false);
    emailAdrress: String = new String();

    constructor() { }

    successSendingEmail(emailSent: Boolean) {
        this.emailSent = emailSent;
    }

    getEmailAdrress(emailAdrress: String) {
        this.emailAdrress = emailAdrress;
    }

}
