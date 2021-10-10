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

    private user?: User;
    private token?: String;

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
                    this.user = response.userData;
                    this.token = response.token;
                    
                    this.user!.imagePath = environment.SERVER_URL + this.user!.imagePath!.substring(2);

                    localStorage.setItem('user', JSON.stringify(this.user));
                    localStorage.setItem('token', JSON.stringify(this.token));

                    this.authenticationBS.next(true);

                    this.router.navigate(['/']);
                },
                (error) => {
                    this.authenticationErrorSubject.next(error.error.message);
                });
    }

    getUserFromMemory() {
        return JSON.parse(localStorage.getItem('user') || 'null') as User;
    }

    getTokenFromMemory() {
        return JSON.parse(localStorage.getItem('token') || 'null') as string;
    }

    logoutUser() {
        this.user = JSON.parse('null');
        localStorage.removeItem('user');

        this.token = JSON.parse('null');
        localStorage.removeItem('token');

        this.authenticationBS.next(false);

        this.router.navigate(['/']);
    }

    async isUserAuthenticated() {
        //this.getUserFromMemory();

        if (await this.getUserFromMemory()) {
            this.dataService
                .checkAuthentication()
                .subscribe(
                    (response) => {
                        console.log("Korisnik je ulogiran");
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
