import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
    selector: 'app-administration-users',
    templateUrl: './administration-users.component.html',
    styleUrls: ['./administration-users.component.scss']
})
export class AdministrationUsersComponent implements OnInit {

    QueryUsername: string = '';

    users: User[] = [];
    usersSubscription: Subscription = new Subscription;

    constructor(
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.userService.getUsers();

        this.usersSubscription = this.userService.usersBS
            .subscribe(res => {
                this.users = res;
            })
    }

    deleteUser(id: Number) {
        this.userService.deleteUser(id);
    }

    ngOnDestory(): void {
        this.usersSubscription.unsubscribe();
    }

}
