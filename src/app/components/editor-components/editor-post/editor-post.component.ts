import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { User } from 'src/app/shared/models/user';
import { AuthorizationGuardService } from 'src/app/shared/services/authorization-guard.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { PostService } from 'src/app/shared/services/post.service';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-editor-post',
    templateUrl: './editor-post.component.html',
    styleUrls: ['./editor-post.component.scss'],
    providers: [AuthorizationGuardService]
})
export class EditorPostComponent implements OnInit, OnDestroy {

    id: Number = new Number;
    newPost: Boolean = new Boolean;

    imageForm: any;
    imageURL: String = new String;

    editorContent: String = new String("Hello World!");

    public options: Object = {
        charCounterCount: true,
        toolbarButtons: {
            'moreText': {
                'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
            },

            'moreParagraph': {
                'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote']
            },

            'moreRich': {
                'buttons': ['insertLink', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertHR']
            }
        }
    };

    public formGroup: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required),
        image: new FormControl(''),
        editor: new FormControl(this.editorContent, Validators.required),
        dateOfCreation: new FormControl('', Validators.required),
        userId: new FormControl('', Validators.required),
        categoryId: new FormControl('', Validators.required)
    });

    users: User[] = [];
    usersSubscription: Subscription = new Subscription;

    categories: Category[] = [];
    categoriesSubscription: Subscription = new Subscription;

    showMessageWindow: Boolean = new Boolean(false);
    successMessage: String = new String;
    errorMessage: String = new String;
    postURL: String = new String;

    constructor(
        private titleService: Title,
        private authorizationGuardService: AuthorizationGuardService,
        private route: ActivatedRoute,

        private postService: PostService,
        private userService: UserService,
        private categoryService: CategoryService
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle("New post");

        this.authorizationGuardService.userNeedsToBeLogged(true);
        this.authorizationGuardService.userNeedsToBeAdmin();

        this.route.params.subscribe(
            params => {
                this.id = params['id'];
                this.newPost = true;

                if (this.id != undefined) {
                    this.getPost(this.id);
                    this.newPost = false;
                }
            });

        this.categoryService.getCategories();
        this.categoriesSubscription = this.categoryService.categoriesBS
            .subscribe(
                res => {
                    this.categories = res;
                });

        this.userService.getUsers();
        this.usersSubscription = this.userService.usersBS
            .subscribe(
                res => {
                    this.users = res;
                });
    }

    get title() { return this.formGroup.get('title'); }
    get image() { return this.formGroup.get('image'); }
    get editor() { return this.formGroup.get('editor'); }
    get dateOfCreation() { return this.formGroup.get('dateOfCreation'); }
    get userId() { return this.formGroup.get('userId'); }
    get categoryId() { return this.formGroup.get('categoryId'); }

    getPost(id: Number) {
        this.postService.getPost(id)
            .subscribe(
                res => {
                    this.editorContent = res.selectedPost[0].content;

                    this.formGroup.setValue({
                        title: res.selectedPost[0].title,
                        image: "",
                        editor: this.editorContent,
                        dateOfCreation: this.ISOToJSDate(res.selectedPost[0].dateOfCreation),
                        userId: res.selectedPost[0].userId,
                        categoryId: res.selectedPost[0].categoryId,
                    });

                    this.imageURL = environment.SERVER_URL + res.selectedPost[0].imagePath.substring(2);

                    this.titleService.setTitle("Edit post: " + res.selectedPost[0].title);
                },
                error => {
                    this.showMessageWindow = true;
                    this.errorMessage = error.error.message;
                }
            );
    }

    ISOToJSDate(date: string) {
        return new Date(date)
            .toISOString()
            .slice(0, 19)
            .replace("Z", "");
    }

    onFileChange(event: any) {
        const reader = new FileReader();

        if (event.target.files.length > 0) {
            this.imageForm = event.target.files[0];

            reader.readAsDataURL(event.target.files[0]);
            reader.onload = () => {
                this.imageURL = reader.result as string;
            };
        }
    }

    onSubmit() {
        let formData = new FormData();

        formData.append("title", this.formGroup.get("title")!.value);
        formData.append("image", this.imageForm);
        formData.append("content", this.formGroup.get("editor")!.value);
        formData.append("dateOfCreation", this.formGroup.get("dateOfCreation")!.value);
        formData.append("userId", this.formGroup.get("userId")!.value);
        formData.append("categoryId", this.formGroup.get("categoryId")!.value);

        if (this.id == undefined) {
            this.postService.postPost(formData);
        } else if (this.id != undefined) {
            this.postService.putPost(this.id, formData);
        }

        this.postService.successPostPutBS
            .subscribe(
                res => {
                    this.showMessageWindow = true;

                    if (res != undefined) {
                        this.id = res;

                        this.successMessage = "Post succesfully posted/updated.";
                        this.errorMessage = "";
                    } else if (res == undefined) {
                        this.successMessage = "";
                        this.errorMessage = "Error while trying to save the post.";
                    }
                });
    }

    closeMessageWindow() {
        this.showMessageWindow = false;
    }

    ngOnDestroy(): void {
        this.categoriesSubscription.unsubscribe();
        this.usersSubscription.unsubscribe();
    }

}
