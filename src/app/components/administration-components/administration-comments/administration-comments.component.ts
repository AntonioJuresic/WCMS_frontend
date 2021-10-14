import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Comment } from 'src/app/shared/models/comment';
import { CommentService } from 'src/app/shared/services/comment.service';

@Component({
    selector: 'app-administration-comments',
    templateUrl: './administration-comments.component.html',
    styleUrls: ['./administration-comments.component.scss']
})
export class AdministrationCommentsComponent implements OnInit {

    comments: Comment[] = [];
    commentsSubscription: Subscription = new Subscription;

    constructor(
        private commentService: CommentService
    ) { }

    ngOnInit(): void {
        this.commentService.getComments();
        
        this.commentsSubscription = this.commentService.commentsBS
            .subscribe(
                res => {
                    this.comments = res;
                });
    }

    deleteComment(id: Number) {
        this.commentService.deleteComment(id);
    }

    ngOnDestroy(): void {
        this.commentsSubscription.unsubscribe();
    }

}
