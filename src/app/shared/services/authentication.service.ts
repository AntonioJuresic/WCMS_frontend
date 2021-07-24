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
                    localStorage.setItem('user', JSON.stringify(this.user));
                    
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

    logoutUser() {
            this.user = JSON.parse('null')
            localStorage.removeItem('user');
    
            this.authenticationChangeSubject.next(false);
            this.router.navigate(['']);
        
    }

    isUserAuthenticated() {
        this.getUserFromMemory();

        if(this.user) {
            return true;
        } else {
            return false;
        }
    }

}
