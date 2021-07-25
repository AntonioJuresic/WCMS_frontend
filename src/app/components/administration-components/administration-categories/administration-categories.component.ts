import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-administration-categories',
  templateUrl: './administration-categories.component.html',
  styleUrls: ['./administration-categories.component.scss']
})
export class AdministrationCategoriesComponent implements OnInit {
  
    categories: Category[] = [];
    categoriesBehaviourSubject: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
    categoriesSubscription: Subscription = new Subscription;

    constructor(
        private categoryService: CategoryService
    ) { }

    ngOnInit(): void {
        this.categoriesBehaviourSubject = this.categoryService.getCategories();
        this.categoriesSubscription = this.categoriesBehaviourSubject
            .subscribe(res => {
                this.categories = res;
            });
    }

    deleteCategory(id: Number) {
        this.categoryService.deleteCategory(id);
    }
}