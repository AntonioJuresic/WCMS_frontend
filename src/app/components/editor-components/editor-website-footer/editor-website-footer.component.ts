import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { WebsiteFooter } from 'src/app/shared/models/websiteFooter';
import { WebsiteFooterService } from 'src/app/shared/services/website-footer.service';

@Component({
  selector: 'app-editor-website-footer',
  templateUrl: './editor-website-footer.component.html',
  styleUrls: ['./editor-website-footer.component.scss']
})
export class EditorWebsiteFooterComponent implements OnInit {

    @Input() websiteFooter?: WebsiteFooter;

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
        private websiteFooterService: WebsiteFooterService
    ) { }

    ngOnInit(): void {
        if (this.websiteFooter?.content != undefined) {
            this.editorContent = this.websiteFooter?.content;

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
        this.websiteFooter = undefined;

        this.formGroup.setValue({
            editor: ""
        });
    }

    onSubmit() {
        let websiteFooter = new WebsiteFooter;
        websiteFooter.content = this.formGroup.get("editor")!.value;

        if (this.websiteFooter?.content != undefined) {
            this.websiteFooterService.putWebsiteFooter(websiteFooter);
        } else if (this.websiteFooter?.content == undefined) {
            this.websiteFooterService.postWebsiteFooter(websiteFooter);
        }

        this.websiteFooterService.successChangingWebsiteFooterBS
            .subscribe(
                res => {
                    if (res != undefined) {
                        this.successMessage = res;
                        this.errorMessage = "";
                    }
                });

        this.websiteFooterService.failureChangingWebsiteFooterBS
            .subscribe(
                res => {
                    if (res != undefined) {
                        this.successMessage = "";
                        this.errorMessage = res;
                    }
                });
    }

}
