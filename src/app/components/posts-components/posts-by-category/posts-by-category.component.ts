import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/shared/models/category';
import { Post } from 'src/app/shared/models/post';
import { CategoryService } from 'src/app/shared/services/category.service';
import { PostService } from 'src/app/shared/services/post.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-posts-by-category',
    templateUrl: './posts-by-category.component.html',
    styleUrls: ['./posts-by-category.component.scss']
})
export class PostsByCategoryComponent implements OnInit {

    name: String = new String;

    category: Category = new Category;
    posts: Post[] = [];

    errorMessage: String = new String;

    constructor(
        private route: ActivatedRoute,
        private titleService: Title,
        private postService: PostService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.name = params['name'];
            this.titleService.setTitle(this.name.valueOf());

            this.getCategoryPosts(this.name);
        });
    }

    getCategoryPosts(name: String) {
        this.postService.getPostsByCategory(name)
            .subscribe(
                (response: { selectedCategory: Category[], selectedPosts: Post[] }) => {
                    this.category = response.selectedCategory[0];
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
