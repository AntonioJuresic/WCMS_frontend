import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/shared/models/category';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
    selector: 'app-editor-category',
    templateUrl: './editor-category.component.html',
    styleUrls: ['./editor-category.component.scss']
})
export class EditorCategoryComponent implements OnInit {

    @Input() category?: Category;
    @Output() editModeFalse = new EventEmitter<boolean>();

    public formGroup: FormGroup = new FormGroup({
        name: new FormControl("", Validators.required)
    });

    errorMessage: String = new String;

    constructor(
        private categoryService: CategoryService
    ) { }

    ngOnInit(): void {
        if (this.category?.id != undefined) {
            this.formGroup.setValue({
                name: this.category?.name
            });
        }
    }

    get name() { return this.formGroup.get('name'); }

    closeEditor() {
        this.category = undefined;

        this.formGroup.setValue({
            name: ""
        });

        this.editModeFalse.emit(false);
    }

    onSubmit() {
        let category = new Category;
        category.name = this.formGroup.value.name;

        if (this.category?.id == undefined) {
            this.categoryService.postCategory(category)
        } else if (this.category?.id != undefined) {
            this.categoryService.putCategory(this.category?.id, category);
        }

        this.closeEditor();
    }

}
