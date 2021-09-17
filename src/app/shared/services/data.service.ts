import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    API_URL = environment.API_URL;

    apiPostRoot = '/post';
    apiCategoryRoot = '/category';

    apiUserRoot = '/user';
    authenticationRoot = '/authentication';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private httpClient: HttpClient) { }

    authenticateUser(username: String, password: String): Observable<any> {
        return this.httpClient.post(this.API_URL + this.authenticationRoot, {
            username: username,
            password: password,
        });
    }

    getUsers(): Observable<any> {
        return this.httpClient.get(this.API_URL + this.apiUserRoot);
    }

    postUser(user: User): Observable<any> {
        return this.httpClient.post(this.API_URL + this.apiUserRoot, user);
    }

    getPosts(): Observable<any> {
        return this.httpClient.get(this.API_URL + this.apiPostRoot);
    }

    getPost(id: Number): Observable<any> {
        return this.httpClient.get(this.API_URL + this.apiPostRoot + `/${id}`);
    }

    postPost(postRequest: FormData): Observable<any> {
        return this.httpClient.post(this.API_URL + this.apiPostRoot, postRequest);
    }
    
    putPost(id: Number, putRequest: FormData): Observable<any> {
        return this.httpClient.put(this.API_URL + this.apiPostRoot + `/${id}`, putRequest);
    }
    
    deletePost(id: Number): Observable<any> {
        return this.httpClient.delete(this.API_URL + this.apiPostRoot + `/${id}`);
    }

    getCategories(): Observable<any> {
        return this.httpClient.get(this.API_URL + this.apiCategoryRoot);
    }

    getCategory(id: Number): Observable<any> {
        return this.httpClient.get(this.API_URL + this.apiCategoryRoot + `/${id}`);
    }

    postCategory(category: Category): Observable<any> {
        return this.httpClient.post(this.API_URL + this.apiCategoryRoot, category);
    }

    putCategory(id: Number, category: Category): Observable<any> {
        return this.httpClient.put(this.API_URL + this.apiCategoryRoot + `/${id}`, category);
    }

    deleteCategory(id: Number): Observable<any> {
        return this.httpClient.delete(this.API_URL + this.apiCategoryRoot + `/${id}`);
    }
}
