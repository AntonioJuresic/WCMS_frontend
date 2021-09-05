import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    users: User[] = [];
    usersBehaviorSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

    constructor(private dataService: DataService) { }

    getUsers() {
        this.dataService.getPosts()
            .subscribe((res: { status: Number, data: User[] }) => {
                this.users = res.data;
                this.usersBehaviorSubject.next(this.users);
            });

        return this.usersBehaviorSubject;
    }

    postUser(newUser: User) {
        return this.dataService.postUser(newUser);
    }
}
