import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../models/user';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private user?: User;
    private token?: String;

    public authenticationCBS: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isAuthenticatedObservable: Observable<boolean> = this.authenticationCBS.asObservable();

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
                    this.user = response.data;
                    this.token = response.token;
                    localStorage.setItem('user', JSON.stringify(this.user));
                    localStorage.setItem('token', JSON.stringify(this.token));

                    this.authenticationCBS.next(true);

                    console.log("USPJESNA PRIJAVA");

                    this.router.navigate(['/']);
                },
                (error) => {
                    this.authenticationErrorSubject.next(error.error.message);
                });
    }

    getUserFromMemory() {
        this.user = JSON.parse(localStorage.getItem('user') || 'null') as User;
    }

    getTokenFromMemory() {
        return JSON.parse(localStorage.getItem('token') || 'null') as string;
    }

    logoutUser() {
        this.user = JSON.parse('null');
        localStorage.removeItem('user');

        this.token = JSON.parse('null');
        localStorage.removeItem('token');

        this.authenticationCBS.next(false);
        this.router.navigate(['/']);
    }

    isUserAuthenticated() {

        this.getUserFromMemory();

        if (this.user) {
            this.dataService
                .checkAuthentication()
                .subscribe(
                    (response) => {
                        this.authenticationCBS.next(true);
                    },
                    (error) => {
                        this.authenticationCBS.next(false);
                    });
        } else {
            this.authenticationCBS.next(false);
        }

    }
}
