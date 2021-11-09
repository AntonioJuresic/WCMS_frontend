import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/shared/models/post';
import { User } from 'src/app/shared/models/user';
import { PostService } from 'src/app/shared/services/post.service';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

    username: String = new String;

    user: User = new User;
    posts: Post[] = [];

    errorMessage: String = new String;

    constructor(
        private route: ActivatedRoute,
        private titleService: Title,

        private postService: PostService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.username = params['username'];
            this.titleService.setTitle(this.username.valueOf());

            this.getUserPosts(this.username);
        });
    }

    getUserPosts(username: String) {
        this.postService.getPostsByUser(username)
            .subscribe(
                (res: {
                    selectedUser: User[],
                    selectedPosts: Post[]
                }) => {
                    this.user = res.selectedUser[0];
                    this.posts = res.selectedPosts;

                    this.user.imagePath = environment.SERVER_URL + this.user.imagePath?.substring(2);

                    this.posts.forEach((post) => {
                        post.imagePath = environment.SERVER_URL + post.imagePath?.substring(2);
                    });
                },
                error => {
                    this.errorMessage = this.errorMessage + error.error.message;
                }
            );
    }

}
