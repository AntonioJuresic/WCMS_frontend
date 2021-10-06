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
        this.authenticationSubscription = this.authenticationService.isAuthenticatedObservable
            .subscribe(res => {
                this.userIsLogged = res;
                console.log("this.userIsLogged - ", this.userIsLogged);
            })
    }

    needsAuthentication() {
        if (!this.userIsLogged) {
            this.router.navigate(['/']);
        }
    }

    canNotAcessAuthenticated() {
        if (this.userIsLogged) {
            this.router.navigate(['/']);
        }
    }
}
