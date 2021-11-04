import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/models/post';

@Component({
    selector: 'app-article-short',
    templateUrl: './article-short.component.html',
    styleUrls: ['./article-short.component.scss']
})
export class ArticleShortComponent implements OnInit {

    @Input() post: Post = new Post;

    constructor() { }

    ngOnInit(): void {
    }

}
