import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WebsiteInfo } from 'src/app/shared/models/websiteInfo';
import { WebsiteInfoService } from 'src/app/shared/services/website-info.service';

@Component({
    selector: 'app-editor-website-info',
    templateUrl: './editor-website-info.component.html',
    styleUrls: ['./editor-website-info.component.scss']
})
export class EditorWebsiteInfoComponent implements OnInit {

    @Input() websiteInfo?: WebsiteInfo;
    @Output() editModeFalse = new EventEmitter<boolean>();

    public formGroup: FormGroup = new FormGroup({
        title: new FormControl("", Validators.required),
        description: new FormControl("", Validators.required)
    });

    errorMessage: String = new String;

    constructor(
        private websiteInfoService: WebsiteInfoService
    ) { }

    ngOnInit(): void {
        if (this.websiteInfo != undefined) {
            this.formGroup.setValue({
                title: this.websiteInfo?.title,
                description: this.websiteInfo?.description
            });
        }
    }

    get title() { return this.formGroup.get('title'); }
    get description() { return this.formGroup.get('description'); }

    closeEditor() {
        this.websiteInfo = undefined;

        this.formGroup.setValue({
            title: "",
            description: ""
        });

        this.editModeFalse.emit(false);
    }

    onSubmit() {
        let websiteInfo = new WebsiteInfo;

        websiteInfo.title = this.formGroup.value.title;
        websiteInfo.description = this.formGroup.value.description;

        if (this.websiteInfo == undefined) {
            this.websiteInfoService.postWebsiteInfo(websiteInfo)
        } else if (this.websiteInfo != undefined) {
            this.websiteInfoService.putWebsiteInfo(websiteInfo);
        }

        this.closeEditor();
    }
}
