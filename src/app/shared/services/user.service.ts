import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
                this.usersBS.next(this.users);
            });
    }

    getUser(id: Number) {
        return this.dataService.getUser(id);
    }

    postUser(newUser: User) {
        return this.dataService.postUser(newUser);
    }
}
