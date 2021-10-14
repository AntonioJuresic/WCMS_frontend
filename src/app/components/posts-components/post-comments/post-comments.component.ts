import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Comment } from 'src/app/shared/models/comment';
import { CommentService } from 'src/app/shared/services/comment.service';

@Component({
    selector: 'app-post-comments',
    templateUrl: './post-comments.component.html',
    styleUrls: ['./post-comments.component.scss']
})
export class PostCommentsComponent implements OnInit {

    @Input() id: Number = new Number;

    comments: Comment[] = [];
    commentsSubscription: Subscription = new Subscription;

    constructor(
        private commentService: CommentService
    ) { }

    ngOnInit(): void {
        /*this.commentService.getCommentsByPost(this.id)
            .subscribe(
                res => {
                    this.comments = res;
                });*/
    }

    ngOnChanges() {
        console.log('id', this.id);
        console.log(this.id != undefined);

        if (this.id != undefined) {
            this.commentService.getCommentsByPost(this.id)
                .subscribe(
                    (res: { selectedComments: Comment[] }) => {
                        this.comments = res.selectedComments;
                    });
        }
    }

}
