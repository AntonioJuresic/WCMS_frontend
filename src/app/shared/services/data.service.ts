import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    apiRoot = environment.apiRoot;

    apiArticlesRoot = "/article";

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private httpClient: HttpClient) {}

    getArticles(): Observable<any> { return this.httpClient.get(this.apiRoot + this.apiArticlesRoot); }
}
