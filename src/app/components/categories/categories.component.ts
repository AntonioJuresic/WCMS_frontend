import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {

    categories: Category[] = [];
    categoriesSubscription: Subscription = new Subscription;

    constructor(
        private categoryService: CategoryService
    ) { }

    ngOnInit(): void {
        this.categoryService.getCategories();

        this.categoriesSubscription = this.categoryService.categoriesBS
            .subscribe(
                res => {
                    this.categories = res;
                });
    }

    ngOnDestroy(): void {
        this.categoriesSubscription.unsubscribe();
    }

}