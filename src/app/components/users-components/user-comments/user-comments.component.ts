import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/shared/services/comment.service';
import { Comment } from 'src/app/shared/models/comment';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-user-comments',
    templateUrl: './user-comments.component.html',
    styleUrls: ['./user-comments.component.scss']
})
export class UserCommentsComponent implements OnInit {

    @Input() username?: String;
    comments: Comment[] = [];
    
    faTrash = faTrash;

    constructor(
        private commentService: CommentService,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit(): void { }

    ngOnChanges() {
        if (this.username != undefined) {
            this.commentService.getCommentsByUser(this.username!)
                .subscribe(
                    (res: {
                        selectedComments: Comment[]
                    }) => {
                        this.comments = res.selectedComments;
                        this.comments.sort((a, b) => { return <any>new Date(b.dateOfCreation) - <any>new Date(a.dateOfCreation) });
                    }
                )
        }
    }

    deleteCommentOnAProfile(id: Number) {
        this.commentService.deleteCommentOnAProfile(id)
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
