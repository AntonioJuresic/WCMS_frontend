import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

    public userIsLogged: boolean = false;
    public user?: User = new User;

    authenticationSubscription: Subscription = new Subscription;

    constructor(
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit(): void {
        this.authenticationService.isUserAuthenticated();

        this.authenticationSubscription = this.authenticationService.authenticationBS
            .subscribe(
                res => {
                    this.userIsLogged = res;
                });

        this.user = this.authenticationService.getUserFromMemory();
    }

    logout() {
        this.authenticationService.logoutUser();
    }

    ngOnDestroy(): void {
        this.authenticationSubscription.unsubscribe();
    }

}
