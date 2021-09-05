import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';
import { Category } from '../models/category';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    apiRoot = environment.apiRoot;

    apiPostRoot = '/post';
    apiCategoryRoot = '/category';

    apiUserRoot = '/user';
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

    getUsers(): Observable<any> { return this.httpClient.get(this.apiRoot + this.apiUserRoot); }
    postUser(user: User): Observable<any> { return this.httpClient.post(this.apiRoot + this.apiUserRoot, user); }

    getPosts(): Observable<any> { return this.httpClient.get(this.apiRoot + this.apiPostRoot); }
    getPost(id: Number): Observable<any> { return this.httpClient.get(this.apiRoot + this.apiPostRoot + `/${id}`); }
    postPost(post: Post): Observable<any> { return this.httpClient.post(this.apiRoot + this.apiPostRoot, post); }
    putPost(id: Number, post: Post): Observable<any> { return this.httpClient.put(this.apiRoot + this.apiPostRoot + `/${id}`, post); }
    deletePost(id: Number): Observable<any> { return this.httpClient.delete(this.apiRoot + this.apiPostRoot + `/${id}`); }

    getCategories(): Observable<any> { return this.httpClient.get(this.apiRoot + this.apiCategoryRoot); }
    getCategory(id: Number): Observable<any> { return this.httpClient.get(this.apiRoot + this.apiCategoryRoot + `/${id}`); }
    postCategory(category: Category): Observable<any> { return this.httpClient.post(this.apiRoot + this.apiCategoryRoot, category); }
    putCategory(id: Number, category: Category): Observable<any> { return this.httpClient.put(this.apiRoot + this.apiCategoryRoot + `/${id}`, category); }
    deleteCategory(id: Number): Observable<any> { return this.httpClient.delete(this.apiRoot + this.apiCategoryRoot + `/${id}`); }
}
