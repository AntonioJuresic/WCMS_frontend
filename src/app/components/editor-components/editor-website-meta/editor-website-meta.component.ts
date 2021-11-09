import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { WebsiteMeta } from 'src/app/shared/models/websiteMeta';
import { WebsiteMetaService } from 'src/app/shared/services/website-meta.service';

@Component({
    selector: 'app-editor-website-meta',
    templateUrl: './editor-website-meta.component.html',
    styleUrls: ['./editor-website-meta.component.scss']
})
export class EditorWebsiteMetaComponent implements OnInit {

    @Input() websiteMeta?: WebsiteMeta;
    @Output() editModeFalse = new EventEmitter<boolean>();

    imageForm: any;
    imageURL: String = new String;

    public formGroup: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required),
        image: new FormControl(''),
        charset: new FormControl('', Validators.required),
        keywords: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        author: new FormControl('', Validators.required),
        viewport: new FormControl('', Validators.required),
    });

    successMessage: String = new String;
    errorMessage: String = new String;

    constructor(
        private websiteMetaService: WebsiteMetaService
    ) { }

    ngOnInit(): void {
        if (this.websiteMeta?.title != undefined) {

            this.formGroup.setValue({
                title: this.websiteMeta?.title,
                image: "",
                charset: this.websiteMeta?.charset,
                keywords: this.websiteMeta?.keywords,
                description: this.websiteMeta?.description,
                author: this.websiteMeta?.author,
                viewport: this.websiteMeta?.viewport
            });

            this.imageURL = this.websiteMeta.imagePath;
        }
    }

    get title() { return this.formGroup.get('title'); }
    get charset() { return this.formGroup.get('charset'); }
    get keywords() { return this.formGroup.get('keywords'); }
    get description() { return this.formGroup.get('description'); }
    get author() { return this.formGroup.get('author'); }
    get viewport() { return this.formGroup.get('viewport'); }

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

    get f(): { [key: string]: AbstractControl } {
        return this.formGroup.controls;
    }

    closeEditor() {
        this.websiteMeta = undefined;

        this.formGroup.setValue({
            title: "",
            image: "",
            charset: "",
            keywords: "",
            description: "",
            author: "",
            viewport: "this.websiteMeta?.viewport"
        });

        this.editModeFalse.emit(false);
    }

    onSubmit() {
        let formData = new FormData();

        formData.append("title", this.formGroup.get("title")!.value);
        formData.append("image", this.imageForm);
        formData.append("charset", this.formGroup.get("charset")!.value);
        formData.append("keywords", this.formGroup.get("keywords")!.value);
        formData.append("description", this.formGroup.get("description")!.value);
        formData.append("author", this.formGroup.get("author")!.value);
        formData.append("viewport", this.formGroup.get("viewport")!.value);


        if (this.websiteMeta?.title != undefined) {
            this.websiteMetaService.putWebsiteMeta(formData);
        } else if (this.websiteMeta?.title == undefined) {
            this.websiteMetaService.postWebsiteMeta(formData);
        }

        this.websiteMetaService.successChangingWebsiteMetaBS
            .subscribe(
                res => {
                    if (res != undefined) {
                        this.successMessage = res;
                        this.errorMessage = "";
                    }
                });

        this.websiteMetaService.failureChangingWebsiteMetaBS
            .subscribe(
                res => {
                    if (res != undefined) {
                        this.successMessage = "";
                        this.errorMessage = res;
                    }
                });
    }

}
