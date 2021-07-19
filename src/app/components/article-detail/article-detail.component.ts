import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/shared/models/article';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
    selector: 'app-article-detail',
    templateUrl: './article-detail.component.html',
    styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
    
    private routeSubscription: Subscription = new Subscription;
    id: String = new String;

    article: Article = new Article;
    errorMessage: String = new String;

    constructor(
        private route: ActivatedRoute,
        private dataService: DataService
    ) { }

    ngOnInit(): void {
        this.routeSubscription = this.route.params.subscribe(params => {
            this.id = params['id'];
            this.getArticle(this.id);
        })
    }

    getArticle(id: String) {
        this.dataService.getArticle(id)
        .subscribe(
            (response) => {
                this.article = response.data[0];
                console.log(this.article);
            },
            (error) => {
                console.error(error);

                this.errorMessage = error.error.message;
                console.error(this.errorMessage);
            }
        )
    }

}
