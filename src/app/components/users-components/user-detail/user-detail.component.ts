import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

    @Input() user = new User;

    constructor() { }

    ngOnInit(): void {
    }

}
