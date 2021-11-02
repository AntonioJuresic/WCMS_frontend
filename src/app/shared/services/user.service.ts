import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { AuthenticationService } from './authentication.service';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    users: User[] = [];
    usersBS: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

    successUserPutBS: BehaviorSubject<String | undefined> = new BehaviorSubject<String | undefined>(undefined);
    failedUserPutBS: BehaviorSubject<String | undefined> = new BehaviorSubject<String | undefined>(undefined);

    constructor(
        private dataService: DataService,
        private authenticationService: AuthenticationService
    ) { }

    getUsers() {
        this.dataService.getUsers()
            .subscribe(
                (res: {
                    selectedUsers: User[]
                }) => {
                    this.users = res.selectedUsers;

                    this.users.forEach((user) => {
                        user.imagePath = environment.SERVER_URL + user.imagePath?.substring(2);
                    });

                    this.users.sort((a, b) => a.username.valueOf().localeCompare(b.username.valueOf()));

                    this.usersBS.next(this.users);
                });
    }

    getUser(id: Number) {
        return this.dataService.getUser(id);
    }

    postUser(newUser: FormData) {
        return this.dataService.postUser(newUser);
    }

    putUser(id: Number, updatedUser: FormData) {
        this.dataService.putUser(id, updatedUser)
            .subscribe(
                (res: {
                    status: Number,
                    selectedUser: User[]
                }) => {
                    res.selectedUser[0].imagePath =
                        environment.SERVER_URL +
                        res.selectedUser[0].imagePath?.substring(2);

                    //this.users = this.users.map(u => u.id !== res.selectedUser[0].id ? u : res.selectedUser[0]);
                    this.users[this.users.findIndex(u => u.id === res.selectedUser[0].id)] = res.selectedUser[0];

                    this.usersBS.next(this.users);

                    this.successUserPutBS.next(res.selectedUser[0].username);
                    this.failedUserPutBS.next(undefined);
                },
                (error) => {
                    this.successUserPutBS.next(undefined);
                    this.failedUserPutBS.next(error.error.error);
                });
    }

    putUserHimself(id: Number, updatedUser: FormData) {
        this.dataService.putUserHimself(id, updatedUser)
            .subscribe(
                (res: {
                    status: Number,
                    selectedUser: User[]
                }) => {
                    res.selectedUser[0].imagePath =
                        environment.SERVER_URL +
                        res.selectedUser[0].imagePath?.substring(2);

                    //this.users = this.users.map(u => u.id !== res.selectedUser[0].id ? u : res.selectedUser[0]);
                    this.users[this.users.findIndex(u => u.id === res.selectedUser[0].id)] = res.selectedUser[0];

                    this.usersBS.next(this.users);

                    this.authenticationService.setUserInMemory(res.selectedUser[0]);

                    this.successUserPutBS.next(res.selectedUser[0].username);
                    this.failedUserPutBS.next(undefined);
                },
                (error) => {
                    this.successUserPutBS.next(undefined);
                    this.failedUserPutBS.next(error.error.error);
                });
    }

    deleteUser(id: Number) {
        this.dataService.deleteUser(id)
            .subscribe(
                res => {
                    this.users.find(u => u.id == id)!.deleted = true;

                    this.usersBS.next(this.users);
                }
            )
    }
}
