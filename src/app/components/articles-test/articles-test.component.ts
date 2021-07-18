import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Article } from 'src/app/shared/models/article';
import { ArticleService } from 'src/app/shared/services/article.service';

@Component({
    selector: 'app-articles-test',
    templateUrl: './articles-test.component.html',
    styleUrls: ['./articles-test.component.scss']
})
export class ArticlesTestComponent implements OnInit {

    articles: Article[] = [];
    articlesSubject: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);
    articleSubscription: Subscription = new Subscription;
    
    constructor( private articleService: ArticleService ) { }

    ngOnInit(): void {
        this.articlesSubject = this.articleService.getArticles();
        this.articleSubscription = this.articlesSubject.subscribe(res => {
            this.articles = res;
            console.log(this.articles);
        });
    }

}
