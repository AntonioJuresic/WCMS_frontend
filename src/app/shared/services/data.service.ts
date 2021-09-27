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

    API_AUTHENTICATION_URL = '/authentication';
    API_USER_URL = '/user';

    API_POST_URL = '/post';

    API_POSTS_BY_CATEGORY_URL = '/category-posts';
    API_POSTS_BY_USER_URL = '/user-posts';

    API_CATEGORY_URL = '/category';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private httpClient: HttpClient) { }

    pingServer(): Observable<any> {
        return this.httpClient.get(this.API_URL);
    }

    authenticateUser(username: String, password: String): Observable<any> {
        return this.httpClient.post(this.API_URL + this.API_AUTHENTICATION_URL, {
            username: username,
            password: password,
        });
    }

    getUsers(): Observable<any> {
        return this.httpClient.get(this.API_URL + this.API_USER_URL);
    }

    postUser(user: User): Observable<any> {
        return this.httpClient.post(this.API_URL + this.API_USER_URL, user);
    }

    getPosts(): Observable<any> {
        return this.httpClient.get(this.API_URL + this.API_POST_URL);
    }

    getPost(id: Number): Observable<any> {
        return this.httpClient.get(this.API_URL + this.API_POST_URL + `/${id}`);
    }

    postPost(postRequest: FormData): Observable<any> {
        return this.httpClient.post(this.API_URL + this.API_POST_URL, postRequest);
    }
    
    putPost(id: Number, putRequest: FormData): Observable<any> {
        return this.httpClient.put(this.API_URL + this.API_POST_URL + `/${id}`, putRequest);
    }
    
    deletePost(id: Number): Observable<any> {
        return this.httpClient.delete(this.API_URL + this.API_POST_URL + `/${id}`);
    }

    getPostsByCategory(): Observable<any> {
        return this.httpClient.get(this.API_URL + this.API_POSTS_BY_CATEGORY_URL);
    }

    getPostsByUser(): Observable<any> {
        return this.httpClient.get(this.API_URL + this.API_POSTS_BY_USER_URL);
    }

    getCategories(): Observable<any> {
        return this.httpClient.get(this.API_URL + this.API_CATEGORY_URL);
    }

    getCategory(id: Number): Observable<any> {
        return this.httpClient.get(this.API_URL + this.API_CATEGORY_URL + `/${id}`);
    }

    postCategory(category: Category): Observable<any> {
        return this.httpClient.post(this.API_URL + this.API_CATEGORY_URL, category);
    }

    putCategory(id: Number, category: Category): Observable<any> {
        return this.httpClient.put(this.API_URL + this.API_CATEGORY_URL + `/${id}`, category);
    }

    deleteCategory(id: Number): Observable<any> {
        return this.httpClient.delete(this.API_URL + this.API_CATEGORY_URL + `/${id}`);
    }
}
