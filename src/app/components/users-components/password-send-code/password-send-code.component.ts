import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AuthorizationGuardService } from 'src/app/shared/services/authorization-guard.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
    selector: 'app-password-send-code',
    templateUrl: './password-send-code.component.html',
    styleUrls: ['./password-send-code.component.scss']
})
export class PasswordSendCodeComponent implements OnInit {

    @Output() emailSent = new EventEmitter<Boolean>();
    @Output() emailAdrress = new EventEmitter<String>();

    public formGroup: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email])
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

    get f(): { [key: string]: AbstractControl } {
        return this.formGroup.controls;
    }

    onSubmit() {
        let email = {
            email: String = this.formGroup.get("email")!.value
        }

        this.userService.sendPasswordEmail(email)
            .subscribe(
                (res: { status: Number, message: String }) => {
                    this.successMessage = res.message;
                    this.errorMessage = "";

                    this.emailSent.emit(new Boolean(true));
                    this.emailAdrress.emit(email.email);
                },
                error => {
                    this.successMessage = "";
                    this.errorMessage = error.error.message;
                }
            );
    }
}