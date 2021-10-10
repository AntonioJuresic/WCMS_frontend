import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';
import { User } from '../models/user';
import { WebsiteInfo } from '../models/websiteInfo';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    API_URL = environment.API_URL;

    API_AUTHENTICATION_URL = '/authentication';

    API_WEBSITE_INFO_URL = '/info';
    API_POST_URL = '/post';

    API_CATEGORY_URL = '/category';
    API_POSTS_BY_CATEGORY_URL = '/category-posts';

    API_USER_URL = '/user';
    API_POSTS_BY_USER_URL = '/user-posts';
    API_USER_HIMSELF_URL = '/user-himself';


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

    checkAuthentication(): Observable<any> {
        return this.httpClient.get(this.API_URL + this.API_AUTHENTICATION_URL);
    }

    //website info

    getWebsiteInfo(): Observable<any> {
        return this.httpClient.get(this.API_URL + this.API_WEBSITE_INFO_URL);
    }

    postWebsiteInfo(websiteInfo: WebsiteInfo): Observable<any> {
        return this.httpClient.post(this.API_URL + this.API_WEBSITE_INFO_URL, websiteInfo);
    }

    putWebsiteInfo(websiteInfo: WebsiteInfo): Observable<any> {
        return this.httpClient.put(this.API_URL + this.API_WEBSITE_INFO_URL, websiteInfo);
    }

    //posts

    getPosts(): Observable<any> {
        return this.httpClient.get(this.API_URL + this.API_POST_URL);
    }

    getPost(id: Number): Observable<any> {
        return this.httpClient.get(this.API_URL + this.API_POST_URL + `/${id}`);
    }

    getPostsByCategory(name: String): Observable<any> {
        return this.httpClient.get(this.API_URL + this.API_POSTS_BY_CATEGORY_URL + `/${name}`);
    }

    getPostsByUser(username: String): Observable<any> {
        return this.httpClient.get(this.API_URL + this.API_POSTS_BY_USER_URL + `/${username}`);
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

    //categories

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

    //users
    
    getUsers(): Observable<any> {
        return this.httpClient.get(this.API_URL + this.API_USER_URL);
    }

    getUser(id: Number): Observable<any> {
        return this.httpClient.get(this.API_URL + this.API_USER_URL + `/${id}`);
    }

    postUser(user: FormData): Observable<any> {
        return this.httpClient.post(this.API_URL + this.API_USER_URL, user);
    }

    putUser(id: Number, user: FormData): Observable<any> {
        return this.httpClient.put(this.API_URL + this.API_USER_URL + `/${id}`, user);
    }

    deleteUser(id: Number): Observable<any> {
        return this.httpClient.delete(this.API_URL + this.API_USER_URL + `/${id}`);
    }

    //user himself
    getUserHimself(id: Number): Observable<any> {
        return this.httpClient.get(this.API_URL + this.API_USER_HIMSELF_URL + `/${id}`);
    }

    putUserHimself(id: Number, user: FormData): Observable<any> {
        return this.httpClient.put(this.API_URL + this.API_USER_HIMSELF_URL + `/${id}`, user);
    }

    deleteUserHimself(id: Number): Observable<any> {
        return this.httpClient.delete(this.API_URL + this.API_USER_HIMSELF_URL + `/${id}`);
    }
}
