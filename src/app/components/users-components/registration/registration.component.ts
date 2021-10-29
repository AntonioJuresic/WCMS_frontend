import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AuthorizationGuardService } from 'src/app/shared/services/authorization-guard.service';
import { UserService } from 'src/app/shared/services/user.service';
import Validation from '../../../shared/utilities/validation';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss'],
    providers: [AuthorizationGuardService]
})
export class RegistrationComponent implements OnInit {

    imageForm: any;
    imageURL: String = new String;

    public formGroup: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        username: new FormControl('', Validators.required),
        image: new FormControl(''),
        password1: new FormControl('', Validators.required),
        password2: new FormControl('', Validators.required)
    },
        {
            validators: [Validation.match('password1', 'password2')]
        });

    successMessage: String = new String;
    errorMessage: String = new String;

    constructor(
        private authorizationGuardService: AuthorizationGuardService,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.authorizationGuardService.userNeedsToBeLogged(false);

        this.authenticationService.authenticationErrorSubject
            .subscribe((error) => {
                this.errorMessage = error;
            });
    }

    get email() { return this.formGroup.get('email'); }
    get username() { return this.formGroup.get('username'); }
    get image() { return this.formGroup.get('image'); }
    get password1() { return this.formGroup.get('password1'); }
    get password2() { return this.formGroup.get('password2'); }

    get f(): { [key: string]: AbstractControl } {
        return this.formGroup.controls;
    }

    onFileChange(event: any) {
        const reader = new FileReader();

        if (event.target.files.length > 0) {
            this.imageForm = event.target.files[0];
        }
    }

    onSubmit() {
        let formData = new FormData();

        formData.append("email", this.formGroup.get("email")!.value);
        formData.append("username", this.formGroup.get("username")!.value);
        formData.append("image", this.imageForm);
        formData.append("password", this.formGroup.get("password1")!.value);

        console.log(formData);

        this.userService.postUser(formData)
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