import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { User } from 'src/app/shared/models/user';
import { AuthorizationGuardService } from 'src/app/shared/services/authorization-guard.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { PostService } from 'src/app/shared/services/post.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
    selector: 'app-editor-post',
    templateUrl: './editor-post.component.html',
    styleUrls: ['./editor-post.component.scss']
})
export class EditorPostComponent implements OnInit {

    id: Number = new Number;
    imageForm: any;

    public formGroup: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required),
        image: new FormControl(''),
        content: new FormControl('', Validators.required),
        dateOfCreation: new FormControl('', Validators.required),
        userId: new FormControl('', Validators.required),
        categoryId: new FormControl('', Validators.required)
    });

    errorMessage: String = new String;

    users: User[] = [];
    usersBehaviourSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    usersSubscription: Subscription = new Subscription;

    categories: Category[] = [];
    categoriesBehaviourSubject: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
    categoriesSubscription: Subscription = new Subscription;

    constructor(
        private authorizationGuardService: AuthorizationGuardService,
        private route: ActivatedRoute,
        private postService: PostService,
        private userService: UserService,
        private categoryService: CategoryService
    ) { }

    ngOnInit(): void {
        this.authorizationGuardService.needsAuthentication();

        this.route.params.subscribe(params => {
            this.id = params['id'];

            if (this.id != undefined) {
                this.getPost(this.id);
            }
        });

        this.categoriesBehaviourSubject = this.categoryService.getCategories();
        this.categoriesSubscription = this.categoriesBehaviourSubject
            .subscribe(res => {
                this.categories = res;
            });

        this.usersBehaviourSubject = this.userService.getUsers();
        this.usersSubscription = this.usersBehaviourSubject
            .subscribe(res => {
                this.users = res;
            });
    }

    get title() { return this.formGroup.get('title'); }
    get image() { return this.formGroup.get('image'); }
    get content() { return this.formGroup.get('content'); }
    get dateOfCreation() { return this.formGroup.get('dateOfCreation'); }
    get userId() { return this.formGroup.get('userId'); }
    get categoryId() { return this.formGroup.get('categoryId'); }

    onFileChange(event: any) {
        if (event.target.files.length > 0) {
            this.imageForm = event.target.files[0];
            console.log(this.imageForm);
        }
    }

    onSubmit() {
        let formData = new FormData();

        formData.append("title", this.formGroup.get("title")!.value);
        formData.append("image", this.imageForm);
        formData.append("content", this.formGroup.get("content")!.value);
        formData.append("dateOfCreation", this.formGroup.get("dateOfCreation")!.value);
        formData.append("userId", this.formGroup.get("userId")!.value);
        formData.append("categoryId", this.formGroup.get("categoryId")!.value);

        if (this.id == undefined) {
            this.postService.postPost(formData);
        } else if (this.id != undefined) {
            this.postService.putPost(this.id, formData);
        }
    }

    getPost(id: Number) {
        this.postService.getPost(id)
            .subscribe(
                (response) => {
                    this.formGroup.setValue({
                        title: response.selectedPost[0].title,
                        //image: response.selectedPost[0].imagePath,
                        image: "",
                        content: response.selectedPost[0].content,
                        dateOfCreation: this.ISOToJSDate(response.selectedPost[0].dateOfCreation),
                        userId: response.selectedPost[0].userId,
                        categoryId: response.selectedPost[0].categoryId,
                    });
                },
                (error) => {
                    this.errorMessage = error.error.message;
                }
            )
    }

    ISOToJSDate(date: string) {
        return new Date(date)
            .toISOString()
            .slice(0, 19)
            .replace("Z", "");
    }

}
