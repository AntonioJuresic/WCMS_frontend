import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationGuardService {

    authenticationSubscription: Subscription = new Subscription;

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) { }

    needsAuthentication() {
        this.authenticationService.isUserAuthenticated();

        this.authenticationService.isAuthenticatedObservable
            .subscribe(res => {
                if (!res) {
                    this.router.navigate(['/']);
                }
            })
    }

    canNotAcessAuthenticated() {
        this.authenticationService.isUserAuthenticated();

        this.authenticationService.isAuthenticatedObservable
            .subscribe(res => {
                if (res) {
                    this.router.navigate(['/']);
                }
            })
    }
}
