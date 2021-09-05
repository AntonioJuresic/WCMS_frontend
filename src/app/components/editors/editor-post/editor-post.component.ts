import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationGuardService } from 'src/app/shared/services/authorization-guard.service';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-editor-post',
  templateUrl: './editor-post.component.html',
  styleUrls: ['./editor-post.component.scss']
})
export class EditorPostComponent implements OnInit {

    id: Number = new Number;

    public formGroup: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required),
        content: new FormControl('', Validators.required),
        dateOfCreation: new FormControl('', Validators.required),
        userId: new FormControl('', Validators.required),
        categoryId: new FormControl('', Validators.required)
    });

    errorMessage: String = new String;

    constructor(
        private authorizationGuardService: AuthorizationGuardService,
        private route: ActivatedRoute,
        private postService: PostService,
    ) { }

    ngOnInit(): void {
        this.authorizationGuardService.needsAuthentication();
        
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.getPost(this.id);
        });
    }

    get title() { return this.formGroup.get('title'); }
    get content() { return this.formGroup.get('content'); }
    get dateOfCreation() { return this.formGroup.get('dateOfCreation'); }
    get userId() { return this.formGroup.get('userId'); }
    get categoryId() { return this.formGroup.get('categoryId'); }

    onSubmit() {
        console.log(this.id);
        if(this.id == undefined) {
            this.postService.postPost(this.formGroup.value);
        } else if(this.id != undefined) {
            this.postService.putPost(this.id, this.formGroup.value);
        }
    }

    getPost(id: Number) {
        this.postService.getPost(id)
            .subscribe(
                (response) => {
                    this.formGroup.setValue({
                        title: response.data[0].title, 
                        content: response.data[0].content,
                        dateOfCreation: response.data[0].dateOfCreation,
                        userId: response.data[0].userId,
                        categoryId: response.data[0].categoryId,
                      });
                },
                (error) => {
                    this.errorMessage = error.error.message;
                }
            )
    }

}
