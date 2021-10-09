import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    users: User[] = [];
    usersBS: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

    constructor(private dataService: DataService) { }

    getUsers() {
        this.dataService.getUsers()
            .subscribe((res: { selectedUsers: User[] }) => {
                this.users = res.selectedUsers;

                this.users.forEach((user) => {
                    user.imagePath = environment.SERVER_URL + user.imagePath?.substring(2);
                });

                this.usersBS.next(this.users);
            });
    }

    getUser(id: Number) {
        return this.dataService.getUser(id);
    }

    postUser(newUser: FormData) {
        return this.dataService.postUser(newUser);
    }
}
