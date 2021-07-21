import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/models/post';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
    selector: 'app-post-detail',
    templateUrl: './post-detail.component.html',
    styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

    private routeSubscription: Subscription = new Subscription;
    id: String = new String;

    post: Post = new Post;
    errorMessage: String = new String;

    constructor(
        private route: ActivatedRoute,
        private dataService: DataService
    ) { }

    

    ngOnInit(): void {
        this.routeSubscription = this.route.params.subscribe(params => {
            this.id = params['id'];
            this.getPost(this.id);
        })
    }

    getPost(id: String) {
        this.dataService.getPost(id)
        .subscribe(
            (response) => {
                this.post = response.data[0];
                console.log(this.post);
            },
            (error) => {
                console.error(error);

                this.errorMessage = error.error.message;
                console.error(this.errorMessage);
            }
        )
    }

}
