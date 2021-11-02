import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Comment } from '../models/comment';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    comments: Comment[] = [];

    commentsBS: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>([]);

    constructor(
        private dataService: DataService
    ) { }

    getComments() {
        this.dataService.getComments()
            .subscribe(
                (res: {
                    selectedComments: Comment[]
                }) => {
                    this.comments = res.selectedComments;
                    this.commentsBS.next(this.comments);
                });
    }

    getComment(id: Number) {
        return this.dataService.getComment(id);
    }

    postComment(newComment: Comment) {
        this.dataService.postComment(newComment)
            .subscribe(
                (res: {
                    selectedComment: Comment[]
                }) => {
                    this.comments.push(res.selectedComment[0]);
                    this.commentsBS.next(this.comments);
                });
    }

    putComment(id: Number, updatedComment: Comment) {
        this.dataService.putComment(id, updatedComment)
            .subscribe(
                (res: {
                    selectedComment: Comment[]
                }) => {
                    this.comments[this.comments.findIndex(c => c.id === res.selectedComment[0].id)] = res.selectedComment[0];
                    this.commentsBS.next(this.comments);
                });
    }

    deleteComment(id: Number) {
        this.dataService.deleteComment(id)
            .subscribe(
                res => {
                    this.comments = this.comments.filter(c => c.id != id);
                    this.commentsBS.next(this.comments);
                });
    }
    
    getCommentsByPost(id: Number) {
        return this.dataService.getCommentsByPost(id);
    }

    postCommentOnAPost(newComment: Comment) {
        return this.dataService.postComment(newComment);
    }

    putCommentOnAPost(id: Number, newComment: Comment) {
        return this.dataService.putComment(id, newComment);
    }

    getCommentsByUser(username: String) {
        return this.dataService.getCommentsByUser(username);
    }
}
