import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

    public userIsLogged: boolean = false;

    authenticationSubscription: Subscription = new Subscription;

    constructor(
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit(): void {
        this.authenticationService.isUserAuthenticated();

        this.authenticationSubscription = this.authenticationService.isAuthenticatedObservable
            .subscribe(res => {
                this.userIsLogged = res;
            })
    }

    logout() {
        this.authenticationService.logoutUser();
    }

}
