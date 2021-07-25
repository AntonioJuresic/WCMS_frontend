import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log(this.authenticationService.getTokenFromMemory());
        const token = this.authenticationService.getTokenFromMemory();

        if (token) {
            const copiedReq = request.clone({
                params: request.params.set('token', this.authenticationService.getTokenFromMemory())
            });

            return next.handle(copiedReq);

        } else {
            return next.handle(request);
        }
    }
}