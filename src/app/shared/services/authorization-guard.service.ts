import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuardService {

    constructor(
        private authenticationServicervice : AuthenticationService,
        private router : Router
    ) { }

    needsAuthentication(){
        if(!this.authenticationServicervice.isUserAuthenticated()){
            this.router.navigate(['/']);
        }
    }

    canNotAcessAuthenticated() {
        if(this.authenticationServicervice.isUserAuthenticated()){
            this.router.navigate(['/']);
        }
    }
}
