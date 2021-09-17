import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    posts: Post[] = [];
    postsBehaviorSubject: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);

    constructor(private dataService: DataService) { }

    getPosts() {
        this.dataService.getPosts()
            .subscribe((res: { status: Number, selectedPosts: Post[] }) => {
                this.posts = res.selectedPosts;
                
                this.posts.forEach((post) => {
                    post.imagePath = environment.SERVER_URL + post.imagePath?.substring(2);
                });

                this.postsBehaviorSubject.next(this.posts);
            });

        return this.postsBehaviorSubject;
    }

    getPost(id: Number) {
        return this.dataService.getPost(id);
    }

    postPost(newPost: FormData) {
        this.dataService.postPost(newPost)
            .subscribe((res: { status: Number, selectedPost: Post }) => {
                res.selectedPost.imagePath = environment.SERVER_URL + res.selectedPost.imagePath?.substring(2);
                this.posts.push(res.selectedPost);
                this.postsBehaviorSubject.next(this.posts);
            });

        return this.postsBehaviorSubject;

    }


    putPost(id: Number, updatedPost: FormData) {
        this.dataService.putPost(id, updatedPost)
            .subscribe((res: { status: Number, selectedPost: Post }) => {
                res.selectedPost.imagePath = environment.SERVER_URL + res.selectedPost.imagePath?.substring(2);
                this.posts.push(res.selectedPost);
                this.postsBehaviorSubject.next(this.posts);
            });

        return this.postsBehaviorSubject;

    }

    deletePost(id: Number) {
        this.dataService.deletePost(id)
            .subscribe(res => {
                this.posts = this.posts.filter(p => p.id != id);
                this.postsBehaviorSubject.next(this.posts);
            });
    }
}
