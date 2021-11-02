import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AuthorizationGuardService } from 'src/app/shared/services/authorization-guard.service';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-editor-user',
    templateUrl: './editor-user.component.html',
    styleUrls: ['./editor-user.component.scss']
})
export class EditorUserComponent implements OnInit {

    id: Number = new Number;
    user: User = new User;

    loggedUser: User = new User;
    userHimself: Boolean = new Boolean(false);

    imageForm: any;
    imageURL: String = new String;

    public formGroup: FormGroup = new FormGroup({
        username: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        image: new FormControl(''),
    });

    showMessageWindow: Boolean = new Boolean(false);
    successMessage: String = new String;
    errorMessage: String = new String;
    userURL: String = new String;

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

                    this.formGroup.setValue({
                        username: window.history.state.user.username,
                        email: window.history.state.user.email,
                        image: ""
                    });

                    this.imageURL = window.history.state.user.imagePath;
                });

        this.loggedUser = this.authenticationService.getUserFromMemory();
        this.userHimself = this.id == this.loggedUser.id

        if (this.loggedUser.authorityLevel == null && !this.userHimself) {
            this.router.navigate(['/']);
        }
    }

    onFileChange(event: any) {
        const reader = new FileReader();

        if (event.target.files.length > 0) {
            this.imageForm = event.target.files[0];

            reader.readAsDataURL(event.target.files[0]);
            reader.onload = () => {
                this.imageURL = reader.result as string;
            };
        }
    }

    get username() { return this.formGroup.get('username'); }
    get email() { return this.formGroup.get('email'); }
    get image() { return this.formGroup.get('image'); }

    get f(): { [key: string]: AbstractControl } {
        return this.formGroup.controls;
    }

    onSubmit() {
        let formData = new FormData();

        formData.append("email", this.formGroup.get("email")!.value);
        formData.append("username", this.formGroup.get("username")!.value);
        formData.append("image", this.imageForm);

        if (this.userHimself) {
            this.userService.putUserHimself(this.id, formData);
        } else {
            this.userService.putUser(this.id, formData);
        }

        this.userService.successUserPutBS
            .subscribe(
                res => {
                    if (res != undefined) {
                        this.successMessage = res;
                        this.errorMessage = "";
                    }
                });

        this.userService.failedUserPutBS
            .subscribe(
                res => {
                    if (res != undefined) {
                        this.successMessage = "";
                        this.errorMessage = res;
                    }
                });

        this.showMessageWindow = true;
    }

    deleteUser(id: Number) {
        this.userService.deleteUser(id);

        if (id == this.loggedUser.id) {
            this.authenticationService.logoutUser();
        }
    }

    closeMessageWindow() {
        this.showMessageWindow = false;
    }

}
