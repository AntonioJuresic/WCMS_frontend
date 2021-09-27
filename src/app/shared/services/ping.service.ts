import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class PingService {

    constructor(
        private dataService: DataService,
        private router: Router
    ) {
        this.pingServer();
    }

    pingServer() {
        this.dataService.pingServer()
            .subscribe(
                (response: { status: Number, message: String }) => { },
                (error) => {
                    this.router.navigate(["/serverdown"]);
                }
            );
    }
}
