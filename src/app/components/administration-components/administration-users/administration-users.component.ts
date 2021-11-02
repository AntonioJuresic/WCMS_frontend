import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/shared/models/user';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
    selector: 'app-administration-users',
    templateUrl: './administration-users.component.html',
    styleUrls: ['./administration-users.component.scss']
})
export class AdministrationUsersComponent implements OnInit {

    faPencilAlt = faPencilAlt;
    faTrash = faTrash;

    QueryUsername: string = '';

    users: User[] = [];
    usersSubscription: Subscription = new Subscription;

    loggedUser: User = new User;

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit(): void {
        this.userService.getUsers();

        this.usersSubscription = this.userService.usersBS
            .subscribe(
                res => {
                    this.users = res;
                });

        this.loggedUser = this.authenticationService.getUserFromMemory();
    }

    deleteUser(id: Number) {
        this.userService.deleteUser(id);

        if (id == this.loggedUser.id) {
            this.authenticationService.logoutUser();
        }
    }

    ngOnDestory(): void {
        this.usersSubscription.unsubscribe();
    }

}
