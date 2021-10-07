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

    async testnaFunkcija(uvjet: boolean) {
        await this.authenticationService.isUserAuthenticated();

        this.authenticationSubscription = this.authenticationService.authenticationBS
            .subscribe(res => {
                let stanjeKorisnika = res;

                console.log("stanjeKorisnika - ", stanjeKorisnika);

                console.log("Poziv suba");

                //treba biti ulogiran
                if (uvjet) {
                    console.log("Korisnik treba biti ulogiran");

                    if (uvjet == stanjeKorisnika) {
                        console.log("Korisnik je ulogiran i može biti ovdje");
                    } else {
                        console.warn("Korisnik nije ulogiran i ne može biti ovdje");
                        this.router.navigate(['/']);
                    }

                    //ne smije biti ulogiran
                } else if (!uvjet) {
                    console.log("Korisnik ne smije biti ulogiran");

                    if (uvjet != stanjeKorisnika) {
                        console.warn("Korisnik je ulogiran i ne može biti ovdje");
                        this.router.navigate(['/']);
                    } else {
                        console.log("Korisnik nije ulogiran i može biti ovdje");
                    }
                }
            });
    }

    ngOnDestroy(): void {
        this.authenticationSubscription.unsubscribe();
    }

}
