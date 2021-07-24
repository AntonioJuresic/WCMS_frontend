import { getSafePropertyAccessString } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
            .subscribe((res: { status: number, description?: string, data: Post[] }) => {
                this.posts = res.data;
                this.postsBehaviorSubject.next(this.posts);
            });

        return this.postsBehaviorSubject
    }
}
