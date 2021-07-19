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

    apiArticlesRoot = "/post";

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private httpClient: HttpClient) { }

    getArticles(): Observable<any> { return this.httpClient.get(this.apiRoot + this.apiArticlesRoot); }

    getArticle(id: String): Observable<any> {
        return this.httpClient.get(this.apiRoot + this.apiArticlesRoot + `/${id}`);
        /*return this.httpClient.get(this.apiRoot + this.apiArticlesRoot + `/${id}`).pipe(
            catchError((error: any) => {
                console.log(error)
                return error;
            })
        )*/
    }
}
