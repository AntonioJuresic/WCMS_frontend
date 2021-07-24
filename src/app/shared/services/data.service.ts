import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, tap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DataService {

    apiRoot = environment.apiRoot;

    apiPostRoot = '/post';
    authenticationRoot = '/authentication';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private httpClient: HttpClient) { }

    authenticateUser(username: String, password: String): Observable<any> {
        return this.httpClient.post(this.apiRoot + this.authenticationRoot, {
            username: username,
            password: password,
        });
    }

    getPosts(): Observable<any> { return this.httpClient.get(this.apiRoot + this.apiPostRoot); }
    getPost(id: String): Observable<any> { return this.httpClient.get(this.apiRoot + this.apiPostRoot + `/${id}`); }
}
