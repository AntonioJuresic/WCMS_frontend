import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorityService {

    constructor(
        private dataService: DataService
    ) { }

    giveAdminAuthority() {

    }

    removeAdminAuthority() {
        
    }
}