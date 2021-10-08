import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationGuardService implements OnDestroy {

    authenticationSubscription: Subscription = new Subscription;

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) { }

    async userNeedsToBeLogged(userLoginRequired: boolean) {
        await this.authenticationService.isUserAuthenticated();

        this.authenticationSubscription = this.authenticationService.authenticationBS
            .subscribe(res => {

                //true ako je ulogiran
                //false ako nije ulogiran
                let userIsLogged = res;

                //treba biti ulogiran
                if (userLoginRequired) {
                    if (userLoginRequired != userIsLogged) {
                        this.router.navigate(['/']);
                    }

                //ne smije biti ulogiran
                } else if (!userLoginRequired) {
                    if (userLoginRequired != userIsLogged) {
                        this.router.navigate(['/']);
                    }
                }
            });
    }

    ngOnDestroy(): void {
        this.authenticationSubscription.unsubscribe();
    }

}
