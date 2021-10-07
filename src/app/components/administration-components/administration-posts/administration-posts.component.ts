import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Post } from 'src/app/shared/models/post';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
    selector: 'app-administration-posts',
    templateUrl: './administration-posts.component.html',
    styleUrls: ['./administration-posts.component.scss']
})
export class AdministrationPostsComponent implements OnInit {

    QueryName: string = '';

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

    deletePost(id: Number) {
        this.postService.deletePost(id);
    }
}