import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/shared/services/comment.service';
import { Comment } from 'src/app/shared/models/comment';

@Component({
    selector: 'app-user-comments',
    templateUrl: './user-comments.component.html',
    styleUrls: ['./user-comments.component.scss']
})
export class UserCommentsComponent implements OnInit {

    @Input() username?: String;
    comments: Comment[] = [];
    
    constructor(
        private commentService: CommentService
    ) { }

    ngOnInit(): void { }

    ngOnChanges() {
        if(this.username != undefined) {
            this.commentService.getCommentsByUser(this.username!)
                .subscribe(
                    (res: { selectedComments: Comment[] }) => {
                        this.comments = res.selectedComments;
                        this.comments.sort((a, b) => { return <any>new Date(b.dateOfCreation) - <any>new Date(a.dateOfCreation) });
                        console.log(this.comments);
                    }
                )
        }
    }

}
