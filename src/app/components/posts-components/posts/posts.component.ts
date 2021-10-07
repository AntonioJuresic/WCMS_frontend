import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Post } from 'src/app/shared/models/post';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

    posts: Post[] = [];
    postsSubscription: Subscription = new Subscription;

    constructor(
        private postService: PostService
    ) { }

    ngOnInit(): void {
        this.postService.getPosts();
        
        this.postsSubscription = this.postService.postsObservable
            .subscribe(
                res => {
                    this.posts = res;
                });
    }

}
