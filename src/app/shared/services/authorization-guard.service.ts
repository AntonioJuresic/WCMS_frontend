import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationGuardService {

    public userIsLogged: boolean = false;
    authenticationSubscription: Subscription = new Subscription;

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) {
        /*this.authenticationService.isUserAuthenticated();

        this.authenticationSubscription = this.authenticationService.isAuthenticatedObservable
            .subscribe(res => {
                this.userIsLogged = res;
                console.log("this.userIsLogged - ", this.userIsLogged);
            })*/
    }

    needsAuthentication() {
        this.authenticationService.isAuthenticatedObservable
            .subscribe(res => {
                if (!res) {
                    this.router.navigate(['/']);
                }
            })
    }

    canNotAcessAuthenticated() {
        this.authenticationService.isAuthenticatedObservable
            .subscribe(res => {
                if (res) {
                    this.router.navigate(['/']);
                }
            })
    }
}
