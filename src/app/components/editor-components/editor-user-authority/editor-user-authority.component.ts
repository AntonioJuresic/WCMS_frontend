import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Invitation } from 'src/app/shared/models/invitation';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AuthorizationGuardService } from 'src/app/shared/services/authorization-guard.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
    selector: 'app-editor-user-authority',
    templateUrl: './editor-user-authority.component.html',
    styleUrls: ['./editor-user-authority.component.scss']
})
export class EditorUserAuthorityComponent implements OnInit {

    id: Number = new Number;

    public formGroup: FormGroup = new FormGroup({
        code: new FormControl('', Validators.required),
    });

    showMessageWindow: Boolean = new Boolean(false);
    successMessage: String = new String;
    errorMessage: String = new String;

    constructor(
        private authorizationGuardService: AuthorizationGuardService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit(): void {
        this.authorizationGuardService.userNeedsToBeLogged(true);

        this.activatedRoute.paramMap
            .subscribe(
                res => {
                    if (window.history.state.user.id == undefined) {
                        this.router.navigate(['/']);
                    }

                    this.id = window.history.state.user.id;
                });
    }

    get code() { return this.formGroup.get('code'); }

    get f(): { [key: string]: AbstractControl } {
        return this.formGroup.controls;
    }

    onSubmit() {
        let invitation = new Invitation;
        invitation.code = this.formGroup.value.code;

        this.userService.giveAuthority(this.id!, invitation)
            .subscribe(
                res => {
                    this.successMessage = "User authority changed!";
                    this.errorMessage = "";
                },
                error => {
                    this.successMessage = "";
                    this.errorMessage = error.error.message;
                }
            );

        this.showMessageWindow = true;
    }

    closeMessageWindow() {
        this.showMessageWindow = false;
    }

    logout() {  
        this.authenticationService.logoutUser();
    }

}
