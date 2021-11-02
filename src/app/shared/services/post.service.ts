import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    posts: Post[] = [];

    postsBS: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
    successPostPutBS: BehaviorSubject<Number | undefined> = new BehaviorSubject<Number | undefined>(undefined);

    constructor(
        private dataService: DataService
    ) { }

    getPosts() {
        this.dataService.getPosts()
            .subscribe(
                (res: {
                    status: Number,
                    selectedPosts: Post[]
                }) => {
                    this.posts = res.selectedPosts;

                    this.posts.forEach((post) => {
                        post.imagePath = environment.SERVER_URL + post.imagePath?.substring(2);
                    });

                    this.postsBS.next(this.posts);
                });
    }

    getPost(id: Number) {
        return this.dataService.getPost(id);
    }

    getPostsByCategory(name: String) {
        return this.dataService.getPostsByCategory(name);
    }

    getPostsByUser(username: String) {
        return this.dataService.getPostsByUser(username);
    }

    postPost(newPost: FormData) {
        this.dataService.postPost(newPost)
            .subscribe(
                (res: {
                    status: Number,
                    selectedPost: Post[]
                }) => {
                    res.selectedPost[0].imagePath =
                        environment.SERVER_URL +
                        res.selectedPost[0].imagePath?.substring(2);

                    this.posts.push(res.selectedPost[0]);
                    this.postsBS.next(this.posts);

                    this.successPostPutBS.next(res.selectedPost[0].id!);
                },
                (error) => {
                    this.successPostPutBS.next(undefined);
                });
    }

    putPost(id: Number, updatedPost: FormData) {
        this.dataService.putPost(id, updatedPost)
            .subscribe(
                (res: {
                    status: Number,
                    selectedPost: Post[]
                }) => {
                    res.selectedPost[0].imagePath =
                        environment.SERVER_URL +
                        res.selectedPost[0].imagePath?.substring(2);

                    //this.posts = this.posts.map(p => p.id !== res.selectedPost[0].id ? p : res.selectedPost[0]);
                    this.posts[this.posts.findIndex(p => p.id === res.selectedPost[0].id)] = res.selectedPost[0];  
                    
                    this.postsBS.next(this.posts);

                    this.successPostPutBS.next(res.selectedPost[0].id!);
                },
                (error) => {
                    this.successPostPutBS.next(undefined);
                });
    }

    deletePost(id: Number) {
        this.dataService.deletePost(id)
            .subscribe(
                res => {
                    this.posts = this.posts.filter(p => p.id != id);
                    this.postsBS.next(this.posts);
                });
    }
}
