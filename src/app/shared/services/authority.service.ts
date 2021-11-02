import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Authority } from '../models/authority';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorityService {

    authorities: Authority[] = [];
    authoritiesBS: BehaviorSubject<Authority[]> = new BehaviorSubject<Authority[]>([]);

    constructor(
        private dataService: DataService
    ) { }

    getAuthorities() {
        this.dataService.getAuthorities()
            .subscribe(
                (res: {
                    selectedAuthorities: Authority[]
                }) => {
                    this.authorities = res.selectedAuthorities;
                    this.authoritiesBS.next(this.authorities);
                }
            )
    }

    postAuthority(authority: Authority) {
        this.dataService.postAuthority(authority)
            .subscribe(
                (res: {
                    status: Number,
                    selectedAuthority: Authority[]
                }) => {
                    this.authorities.push(res.selectedAuthority[0]);
                    this.authoritiesBS.next(this.authorities);
                });
    }

    putAuthority(id: Number, authority: Authority) {
        this.dataService.putAuthority(id, authority)
            .subscribe(
                (res: {
                    status: Number,
                    selectedAuthority: Authority[]
                }) => {
                    this.authorities = this.authorities.map(a => a.id !== res.selectedAuthority[0].id ? a : res.selectedAuthority[0]);
                    this.authoritiesBS.next(this.authorities);
                });
    }

    deleteAuthority(id: Number) {
        this.dataService.deleteAuthority(id)
            .subscribe(
                res => {
                    this.authorities = this.authorities.filter(a => a.id != id);
                    this.authoritiesBS.next(this.authorities);
                });
    }

    giveAdminAuthority() {

    }

    removeAdminAuthority() {

    }
}
