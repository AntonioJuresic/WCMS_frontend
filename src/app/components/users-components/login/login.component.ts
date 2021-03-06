import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { User } from 'src/app/shared/models/user';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AuthorizationGuardService } from 'src/app/shared/services/authorization-guard.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [AuthorizationGuardService]
})
export class LoginComponent implements OnInit {

    public formGroup: FormGroup = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });

    errorMessage: String = new String;

    constructor(
        private titleService: Title,
        private authorizationGuardService: AuthorizationGuardService,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle("Login");

        this.authorizationGuardService.userNeedsToBeLogged(false);

        this.authenticationService.authenticationErrorSubject
            .subscribe((error) => {
                this.errorMessage = error;
            });
    }

    get username() { return this.formGroup.get('username'); }
    get password() { return this.formGroup.get('password'); }

    onSubmit() {
        this.authenticationService.loginUser(this.formGroup.value.username, this.formGroup.value.password);
    }
}
