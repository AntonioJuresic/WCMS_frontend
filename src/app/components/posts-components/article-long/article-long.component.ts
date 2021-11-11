import { Component, Input, OnInit } from '@angular/core';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Post } from 'src/app/shared/models/post';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
    selector: 'app-article-long',
    templateUrl: './article-long.component.html',
    styleUrls: ['./article-long.component.scss']
})
export class ArticleLongComponent implements OnInit {

    @Input() post: Post = new Post;

    faPencilAlt = faPencilAlt;

    constructor(
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit(): void {
    }


    userCanEditPost() {
        let user = this.authenticationService.getUserFromMemory();

        if (user == undefined) {
            return false;
        }

        return user.authorityLevel != undefined && user.authorityLevel > 0;

    }

}
