import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-administration-categories',
  templateUrl: './administration-categories.component.html',
  styleUrls: ['./administration-categories.component.scss']
})
export class AdministrationCategoriesComponent implements OnInit, OnDestroy {
  
    categories: Category[] = [];
    categoriesSubscription: Subscription = new Subscription;

    editMode : Boolean = false;
    categoryForEdit? : Category;

    constructor(
        private categoryService: CategoryService
    ) { }

    ngOnInit(): void {
        this.categoryService.getCategories();

        this.categoriesSubscription = this.categoryService.categoriesBS
            .subscribe(res => {
                this.categories = res;
            });
    }

    openEditor(selectedCategory? : Category) {
        this.editMode = true;
        this.categoryForEdit = selectedCategory;
    }

    closeEditor(boolean: Boolean) {
        this.editMode = boolean;
    }

    deleteCategory(id: Number) {
        this.categoryService.deleteCategory(id);
    }

    ngOnDestroy(): void {
        this.categoriesSubscription.unsubscribe();
    }
}