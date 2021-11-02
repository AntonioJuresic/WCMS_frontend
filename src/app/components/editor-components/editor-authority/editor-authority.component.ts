import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Authority } from 'src/app/shared/models/authority';
import { AuthorityService } from 'src/app/shared/services/authority.service';

@Component({
    selector: 'app-editor-authority',
    templateUrl: './editor-authority.component.html',
    styleUrls: ['./editor-authority.component.scss']
})
export class EditorAuthorityComponent implements OnInit {

    @Input() authority?: Authority;
    @Output() editModeFalse = new EventEmitter<boolean>();

    public formGroup: FormGroup = new FormGroup({
        level: new FormControl("", Validators.required),
        title: new FormControl("", Validators.required)
    });

    constructor(
        private authorityService: AuthorityService
    ) { }

    ngOnInit(): void {
        if (this.authority?.id != undefined) {
            this.formGroup.setValue({
                level: this.authority?.level,
                title: this.authority?.title
            });
        }
    }

    get level() { return this.formGroup.get('level'); }
    get title() { return this.formGroup.get('title'); }

    closeEditor() {
        this.authority = undefined;

        this.formGroup.setValue({
            level: "",
            title: ""
        });

        this.editModeFalse.emit(false);
    }

    onSubmit() {
        let authority = new Authority;
        authority.level = this.formGroup.value.level;
        authority.title = this.formGroup.value.title;

        if (this.authority?.id == undefined) {
            this.authorityService.postAuthority(authority)
        } else if (this.authority?.id != undefined) {
            this.authorityService.putAuthority(this.authority?.id, authority);
        }

        this.closeEditor();
    }
}
