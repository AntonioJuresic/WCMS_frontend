import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { WebsiteHeader } from 'src/app/shared/models/websiteHeader';
import { WebsiteHeaderService } from 'src/app/shared/services/website-header.service';

@Component({
    selector: 'app-editor-website-header',
    templateUrl: './editor-website-header.component.html',
    styleUrls: ['./editor-website-header.component.scss']
})
export class EditorWebsiteHeaderComponent implements OnInit {

    @Input() websiteHeader?: WebsiteHeader;

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
        editor: new FormControl(this.editorContent, Validators.required)
    });

    successMessage: String = new String;
    errorMessage: String = new String;

    constructor(
        private websiteHeaderService: WebsiteHeaderService
    ) { }

    ngOnInit(): void {
        if (this.websiteHeader?.content != undefined) {
            this.editorContent = this.websiteHeader?.content;

            this.formGroup.setValue({
                editor: this.editorContent
            });
        }
    }

    get editor() { return this.formGroup.get('editor'); }

    get f(): { [key: string]: AbstractControl } {
        return this.formGroup.controls;
    }

    closeEditor() {
        this.websiteHeader = undefined;

        this.formGroup.setValue({
            editor: ""
        });
    }

    onSubmit() {
        let websiteHeader = new WebsiteHeader;
        websiteHeader.content = this.formGroup.get("editor")!.value;

        if (this.websiteHeader?.content != undefined) {
            this.websiteHeaderService.putWebsiteHeader(websiteHeader);
        } else if (this.websiteHeader?.content == undefined) {
            this.websiteHeaderService.postWebsiteHeader(websiteHeader);
        }

        this.websiteHeaderService.successChangingWebsiteHeaderBS
            .subscribe(
                res => {
                    if (res != undefined) {
                        this.successMessage = res;
                        this.errorMessage = "";
                    }
                });

        this.websiteHeaderService.failureChangingWebsiteHeaderBS
            .subscribe(
                res => {
                    if (res != undefined) {
                        this.successMessage = "";
                        this.errorMessage = res;
                    }
                });
    }

}
