import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Article } from '../models/article';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    articles: Article[] = [];
    articlesSubject: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);

    constructor(private dataService: DataService) { }

    getArticles() {
        this.dataService.getArticles()
            .subscribe((res: { status: number, description?: string, data: Article[] }) => {
                console.log(res);
                this.articles = res.data;
                this.articlesSubject.next(this.articles);
            });

        return this.articlesSubject
    }
}
