import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

    imageForm: any;
    imageURL: String = new String;

    public formGroup: FormGroup = new FormGroup({
        username: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        image: new FormControl(''),
    });

    showMessageWindow: Boolean = new Boolean(false);
    successMessage: String = new String;
    userURL: String = new String;
    errorMessage: String = new String;

    constructor(
        private authorizationGuardService: AuthorizationGuardService,
        private route: ActivatedRoute,
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit(): void {
        this.authorizationGuardService.userNeedsToBeLogged(true);

        this.route.params.subscribe(params => {
            this.id = params['id'];

            this.getUser(this.id);
        });

        this.loggedUser = this.authenticationService.getUserFromMemory();
    }

    onFileChange(event: any) {
        const reader = new FileReader();

        if (event.target.files.length > 0) {
            this.imageForm = event.target.files[0];

            console.log(this.imageForm);

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

    getUser(id: Number) {
        this.userService.getUser(id)
            .subscribe(
                (response) => {
                    this.user = response.selectedUser[0];

                    this.formGroup.setValue({
                        username: response.selectedUser[0].username,
                        email: response.selectedUser[0].email,
                        image: ""
                    });

                    this.imageURL = environment.SERVER_URL + response.selectedUser[0].imagePath.substring(2);
                },
                (error) => {
                    this.showMessageWindow = true;
                    this.errorMessage = error.error.message;
                }
            )
    }

    onSubmit() {
        let formData = new FormData();

        formData.append("email", this.formGroup.get("email")!.value);
        formData.append("username", this.formGroup.get("username")!.value);
        formData.append("image", this.imageForm);

        this.userService.putUser(this.id, formData);

        this.userService.successUserPutBS
            .subscribe(res => {
                if (res != undefined) {
                    this.successMessage = res;
                    this.errorMessage = "";
                }
            })

        this.userService.failedUserPutBS
            .subscribe(res => {
                if (res != undefined) {
                    this.successMessage = "";
                    this.errorMessage = res;
                }
            })

        this.showMessageWindow = true;
    }

    deleteUser(id: Number) {
        console.log(id);
        console.log(this.user.id);

        this.userService.deleteUser(id);

        if(id == this.loggedUser.id) {
            this.authenticationService.logoutUser();
        }
    }

    closeMessageWindow() {
        this.showMessageWindow = false;
    }

}
