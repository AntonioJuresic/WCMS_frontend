import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../models/user';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private user?: User;
    private token?: String;

    public authenticationChangeSubject: Subject<boolean> = new Subject<boolean>();
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

                    this.authenticationChangeSubject.next(true);
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

        this.authenticationChangeSubject.next(false);
        this.router.navigate(['']);

    }

    isUserAuthenticated() {
        this.getUserFromMemory();

        if (this.user) {
            return true;
        } else {
            return false;
        }
    }

}
