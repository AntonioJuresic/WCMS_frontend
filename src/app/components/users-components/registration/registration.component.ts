import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AuthorizationGuardService } from 'src/app/shared/services/authorization-guard.service';
import { UserService } from 'src/app/shared/services/user.service';
import Validation from '../../../shared/utilities/validation';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

    public formGroup: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        username: new FormControl('', Validators.required),
        password1: new FormControl('', Validators.required),
        password2: new FormControl('', Validators.required)
    },
        {
            validators: [Validation.match('password1', 'password2')]
        });

    successMessage: String = new String;
    errorMessage: String = new String;

    newUser: User = new User();
    currentDate: Date = new Date();

    constructor(
        private authorizationGuardService: AuthorizationGuardService,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.authorizationGuardService.canNotAcessAuthenticated();

        this.authenticationService.authenticationErrorSubject
            .subscribe((error) => {
                this.errorMessage = error;
            });
    }

    get email() { return this.formGroup.get('email'); }
    get username() { return this.formGroup.get('username'); }
    get password1() { return this.formGroup.get('password1'); }
    get password2() { return this.formGroup.get('password2'); }

    get f(): { [key: string]: AbstractControl } {
        return this.formGroup.controls;
    }

    onSubmit() {
        this.newUser.email = this.formGroup.value.email;
        this.newUser.username = this.formGroup.value.username;
        this.newUser.password = this.formGroup.value.password1;

        this.userService.postUser(this.newUser)
            .subscribe(
                (response: { selectedUser?: User }) => {
                    this.successMessage = "User created!";
                    this.errorMessage = "";
                },
                (error) => {
                    console.log(error.error.error);
                    this.successMessage = "";
                    this.errorMessage = error.error.error;
                }
            );
    }

}