import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { Post } from 'src/app/shared/models/post';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
    selector: 'app-post-detail',
    templateUrl: './post-detail.component.html',
    styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

    id: Number = new Number;

    post: Post = new Post;
    errorMessage: String = new String;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private postService: PostService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.getPost(this.id);
        });
    }

    getPost(id: Number) {
        this.postService.getPost(id)
            .subscribe(
                (response) => {
                    this.post = response.data[0];
                    console.log(this.post);
                },
                (error) => {
                    this.errorMessage = error.error.message;
                    console.error(this.errorMessage);
                }
            )
    }

}
