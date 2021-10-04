import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

    public userIsLogged: boolean = false;
    public authenticationChangeSubject: Subject<boolean> = new Subject<boolean>();
    authenticationSubscription: Subscription = new Subscription;

    constructor(
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit(): void {
        this.authenticationChangeSubject = this.authenticationService.authenticationChangeSubject;
        this.authenticationSubscription = this.authenticationChangeSubject
            .subscribe(res => {
                this.userIsLogged = res;
            })

        this.userIsLogged = this.authenticationService.isUserAuthenticated();
    }

    logout() {
        this.authenticationService.logoutUser();
    }

}
