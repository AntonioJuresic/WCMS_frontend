import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/models/post';

@Component({
    selector: 'app-article-long',
    templateUrl: './article-long.component.html',
    styleUrls: ['./article-long.component.scss']
})
export class ArticleLongComponent implements OnInit {

    @Input() post: Post = new Post;
    
    constructor() { }

    ngOnInit(): void {
    }

}
