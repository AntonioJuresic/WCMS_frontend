import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/category';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
    selector: 'app-editor-category',
    templateUrl: './editor-category.component.html',
    styleUrls: ['./editor-category.component.scss']
})
export class EditorCategoryComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}
