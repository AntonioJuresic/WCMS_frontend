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
        date_of_creation: new FormControl('', Validators.required),
        user_id: new FormControl('', Validators.required),
        category_id: new FormControl('', Validators.required)
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
    get date_of_creation() { return this.formGroup.get('date_of_creation'); }
    get user_id() { return this.formGroup.get('user_id'); }
    get category_id() { return this.formGroup.get('category_id'); }

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
                        date_of_creation: response.data[0].date_of_creation,
                        user_id: response.data[0].user_id,
                        category_id: response.data[0].category_id,
                      });
                },
                (error) => {
                    //this.errorMessage = error.error.message;
                }
            )
    }

}
