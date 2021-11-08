import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AuthorizationGuardService } from 'src/app/shared/services/authorization-guard.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
    selector: 'app-password-reset',
    templateUrl: './password-reset.component.html',
    styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

    @Input() emailAdrress: String = new String();

    public formGroup: FormGroup = new FormGroup({
        code: new FormControl('', Validators.required),
        password1: new FormControl('', Validators.required),
        password2: new FormControl('', Validators.required)
    });

    successMessage: String = new String();
    errorMessage: String = new String();

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

    get code() { return this.formGroup.get('code'); }
    get password1() { return this.formGroup.get('password1'); }
    get password2() { return this.formGroup.get('password2'); }

    get f(): { [key: string]: AbstractControl } {
        return this.formGroup.controls;
    }

    onSubmit() {
        let resetPassword = {
            code: this.formGroup.get("code")!.value,
            password: this.formGroup.get("password1")!.value
        }

        this.userService.changePassword(this.emailAdrress, resetPassword)
            .subscribe(
                (res: { status: Number, message: String }) => {
                    this.successMessage = res.message;
                    this.errorMessage = "";
                },
                error => {
                    this.successMessage = "";
                    this.errorMessage = error.error.message;
                }
            );
    }
}