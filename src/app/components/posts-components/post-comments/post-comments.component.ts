import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Comment } from 'src/app/shared/models/comment';
import { CommentService } from 'src/app/shared/services/comment.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-post-comments',
    templateUrl: './post-comments.component.html',
    styleUrls: ['./post-comments.component.scss']
})
export class PostCommentsComponent implements OnInit {

    @Input() postId: Number = new Number;

    comments: Comment[] = [];
    commentsSubscription: Subscription = new Subscription;
    
    faTrash = faTrash;

    public formGroup: FormGroup = new FormGroup({
        content: new FormControl("", Validators.required)
    });

    constructor(
        private commentService: CommentService,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit(): void { }

    ngOnChanges() {
        if (this.postId != undefined) {
            this.commentService.getCommentsByPost(this.postId)
                .subscribe(
                    (res: {
                        selectedComments: Comment[]
                    }) => {
                        this.comments = res.selectedComments;
                        this.comments.sort((a, b) => {
                            return <any>new Date(b.dateOfCreation) - <any>new Date(a.dateOfCreation)
                        });
                    });
        }
    }

    get content() { return this.formGroup.get('content'); }

    onSubmit() {
        let comment = new Comment;
        comment.content = this.formGroup.value.content;
        comment.postId = this.postId;

        let user = this.authenticationService.getUserFromMemory();
        comment.userId = user.id!;

        this.formGroup.setValue({
            content: ""
        });

        this.formGroup.markAsUntouched();
        this.formGroup.markAsPristine();

        this.postCommentOnPost(comment);
    }

    postCommentOnPost(newComment: Comment) {
        this.commentService.postCommentOnAPost(newComment)
            .subscribe(
                (res: {
                    selectedComment: Comment[]
                }) => {
                    this.comments.push(res.selectedComment[0]);
                    this.comments.sort((a, b) => { return <any>new Date(b.dateOfCreation) - <any>new Date(a.dateOfCreation) });
                });
    }

    deleteCommentOnAPost(id: Number) {
        this.commentService.deleteCommentOnAPost(id)
            .subscribe(
                res => {
                    this.comments = this.comments.filter(c => c.id != id);
                });
    }

    userCanDeleteComment(userId: Number) {
        let user = this.authenticationService.getUserFromMemory();

        if (user == undefined) {
            return false;
        }

        return user.id == userId ||
            (user.authorityLevel != undefined && user.authorityLevel > 0);

    }
}
