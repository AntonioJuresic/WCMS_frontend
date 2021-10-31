import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';
import { Comment } from '../models/comment';
import { Invitation } from '../models/invitation';
import { WebsiteInfo } from '../models/websiteInfo';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    API_URL = environment.API_URL;

    API_AUTHENTICATION_URL = '/authentication';

    API_WEBSITE_INFO_URL = '/info';
    
    API_POST_URL = '/post';
    API_COMMENTS_BY_POST_URL = '/post-comments';

    API_CATEGORY_URL = '/category';
    API_POSTS_BY_CATEGORY_URL = '/category-posts';

    API_USER_URL = '/user';
    API_POSTS_BY_USER_URL = '/user-posts';
    API_COMMENTS_BY_USER_URL = '/user-comments';
    API_USER_HIMSELF_URL = '/user-himself';
    API_USER_AUTHORITY_URL = 'user-authority';

    API_COMMENT_URL = '/comment';

    API_INVITATION_URL = '/invitation';

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

    postPost(postRequest: FormData): Observable<any> {
        return this.httpClient.post(this.API_URL + this.API_POST_URL, postRequest);
    }
    
    putPost(id: Number, putRequest: FormData): Observable<any> {
        return this.httpClient.put(this.API_URL + this.API_POST_URL + `/${id}`, putRequest);
    }
    
    deletePost(id: Number): Observable<any> {
        return this.httpClient.delete(this.API_URL + this.API_POST_URL + `/${id}`);
    }

    getPostsByCategory(name: String): Observable<any> {
        return this.httpClient.get(this.API_URL + this.API_POSTS_BY_CATEGORY_URL + `/${name}`);
    }

    getPostsByUser(username: String): Observable<any> {
        return this.httpClient.get(this.API_URL + this.API_POSTS_BY_USER_URL + `/${username}`);
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

    // comments

    getComments(): Observable<any> {
        return this.httpClient.get(this.API_URL + this.API_COMMENT_URL);
    }

    getComment(id: Number): Observable<any> {
        return this.httpClient.get(this.API_URL + this.API_COMMENT_URL + `/${id}`);
    }

    postComment(commentRequest: Comment): Observable<any> {
        return this.httpClient.post(this.API_URL + this.API_COMMENT_URL, commentRequest);
    }
    
    putComment(id: Number, commentRequest: Comment): Observable<any> {
        return this.httpClient.put(this.API_URL + this.API_COMMENT_URL + `/${id}`, commentRequest);
    }
    
    deleteComment(id: Number): Observable<any> {
        return this.httpClient.delete(this.API_URL + this.API_COMMENT_URL + `/${id}`);
    }

    getCommentsByPost(id: Number): Observable<any> {
        return this.httpClient.get(this.API_URL + this.API_COMMENTS_BY_POST_URL + `/${id}`);
    }

    getCommentsByUser(username: String): Observable<any> {
        return this.httpClient.get(this.API_URL + this.API_COMMENTS_BY_USER_URL + `/${username}`);
    }

    // user authority
    giveAdminAuthority() { }

    removeAdminAuthority() { }

    // invitation
    getInvitations(): Observable<any> {
        return this.httpClient.get(this.API_URL + this.API_INVITATION_URL);
    }

    postInvitation(invitation: Invitation): Observable<any> {
        return this.httpClient.post(this.API_URL + this.API_INVITATION_URL, invitation);
    }

    putInvitation(id: Number, invitation: Invitation): Observable<any> {
        return this.httpClient.put(this.API_URL + this.API_INVITATION_URL + `/${id}`, invitation);
    }

    deleteInvitation(id: Number): Observable<any> {
        return this.httpClient.delete(this.API_URL + this.API_INVITATION_URL + `/${id}`);
    }
}
