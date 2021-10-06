import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/shared/models/post';
import { User } from 'src/app/shared/models/user';
import { PostService } from 'src/app/shared/services/post.service';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-posts-by-user',
  templateUrl: './posts-by-user.component.html',
  styleUrls: ['./posts-by-user.component.scss']
})
export class PostsByUserComponent implements OnInit {

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
                (response: { selectedUser: User[], selectedPosts: Post[] }) => {
                    this.user = response.selectedUser[0];
                    this.posts = response.selectedPosts;

                    this.posts.forEach((post) => {
                        post.imagePath = environment.SERVER_URL + post.imagePath?.substring(2);
                    });
                },
                (error) => {
                    this.errorMessage = this.errorMessage + error.error.message;
                }
            );
    }

}
