import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, tap } from "rxjs/operators";
import { of } from "rxjs";
import { Post } from '../models/post';
import { Category } from '../models/category';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    apiRoot = environment.apiRoot;

    apiPostRoot = '/post';
    apiCategoryRoot = '/category';

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
    getPost(id: Number): Observable<any> { return this.httpClient.get(this.apiRoot + this.apiPostRoot + `/${id}`); }
    postPost(post: Post): Observable<any> { return this.httpClient.post(this.apiRoot + this.apiPostRoot, post); }
    putPost(post: Post): Observable<any> { return this.httpClient.put(this.apiRoot + this.apiPostRoot, post); }
    deletePost(id: Number): Observable<any> { return this.httpClient.delete(this.apiRoot + this.apiPostRoot + `/${id}`); }

    getCategories(): Observable<any> { return this.httpClient.get(this.apiRoot + this.apiCategoryRoot); }
    getCategory(id: Number): Observable<any> { return this.httpClient.get(this.apiRoot + this.apiCategoryRoot + `/${id}`); }
    postCategory(category: Category): Observable<any> { return this.httpClient.post(this.apiRoot + this.apiCategoryRoot, category); }
    putCategory(category: Category): Observable<any> { return this.httpClient.put(this.apiRoot + this.apiCategoryRoot, category); }
    deleteCategory(id: Number): Observable<any> { return this.httpClient.delete(this.apiRoot + this.apiCategoryRoot + `/${id}`); }

}
