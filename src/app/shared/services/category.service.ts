import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../models/category';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {


    categories: Category[] = [];
    categoriesBS: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);

    constructor(private dataService: DataService) { }

    getCategories() {
        this.dataService.getCategories()
            .subscribe((res: { status: Number, selectedCategories: Category[] }) => {
                this.categories = res.selectedCategories;
                this.categoriesBS.next(this.categories);
            });
    }

    getCategory(id: Number) {
        return this.dataService.getCategory(id);
    }

    postCategory(newCategory: Category) {
        this.dataService.postCategory(newCategory)
            .subscribe((res: { status: Number, selectedCategory: Category[] }) => {
                this.categories.push(res.selectedCategory[0]);
                this.categoriesBS.next(this.categories);
            });
    }

    putCategory(id: Number, updatedCategory: Category) {
        this.dataService.putCategory(id, updatedCategory)
            .subscribe((res: { status: Number, selectedCategory: Category[] }) => {
                this.categories[this.categories.findIndex(c => c.id === res.selectedCategory[0].id)] = res.selectedCategory[0];
                this.categoriesBS.next(this.categories);
            });

    }

    deleteCategory(id: Number) {
        this.dataService.deleteCategory(id)
            .subscribe(res => {
                console.log(res);
                this.categories = this.categories.filter(p => p.id != id);
                this.categoriesBS.next(this.categories);
            });
    }
}
