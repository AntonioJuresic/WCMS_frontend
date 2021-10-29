import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    public authenticationBS: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public authenticationErrorSubject: Subject<string> = new Subject<string>();

    constructor(
        private dataService: DataService,
        private router: Router
    ) { }

    loginUser(username: String, password: String) {
        this.dataService
            .authenticateUser(username, password)
            .subscribe(
                (response) => {
                    let user = response.userData;
                    let token = response.token;

                    user!.imagePath = environment.SERVER_URL + user!.imagePath.substring(2);

                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('token', JSON.stringify(token));

                    this.authenticationBS.next(true);

                    this.router.navigate(['/']);
                },
                (error) => {
                    this.authenticationErrorSubject.next(error.error.message);
                });
    }

    setUserInMemory(user: User) {
        localStorage.setItem('user', JSON.stringify(user));
        console.log(this.getUserFromMemory());
    }

    getUserFromMemory() {
        return JSON.parse(localStorage.getItem('user') || 'null') as User;
    }

    getTokenFromMemory() {
        return JSON.parse(localStorage.getItem('token') || 'null') as string;
    }

    logoutUser() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        this.authenticationBS.next(false);

        this.router.navigate(['/']);
    }

    async isUserAuthenticated() {
        if (await this.getUserFromMemory()) {
            this.dataService
                .checkAuthentication()
                .subscribe(
                    (response) => {
                        this.authenticationBS.next(true);
                    },
                    (error) => {
                        this.authenticationBS.next(false);
                    });
        } else {
            this.authenticationBS.next(false);
        }
    }
}
