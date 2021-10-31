import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Invitation } from 'src/app/shared/models/invitation';
import { InvitationService } from 'src/app/shared/services/invitation.service';

@Component({
    selector: 'app-editor-invitation',
    templateUrl: './editor-invitation.component.html',
    styleUrls: ['./editor-invitation.component.scss']
})
export class EditorInvitationComponent implements OnInit {

    @Input() invitation?: Invitation;
    @Output() editModeFalse = new EventEmitter<boolean>();

    public formGroup: FormGroup = new FormGroup({
        code: new FormControl("", [Validators.required, Validators.maxLength(6)]),
        emailAddress: new FormControl("", [Validators.required, Validators.email, Validators.maxLength(255)]),
        emailSubject: new FormControl("", [Validators.required, Validators.maxLength(255)]),
        emailMessage: new FormControl("", [Validators.required, Validators.maxLength(255)])
    });

    erroremailMessage: String = new String;

    constructor(
        private invitationService: InvitationService
    ) { }

    ngOnInit(): void {
        if (this.invitation?.id != undefined) {

            console.log(this.invitation);

            this.formGroup.setValue({
                code: this.invitation?.code,
                emailAddress: this.invitation?.emailAddress,
                emailSubject: this.invitation?.emailSubject,
                emailMessage: this.invitation?.emailMessage
            });
        }
    }

    get code() { return this.formGroup.get('code'); }
    get emailAddress() { return this.formGroup.get('emailAddress'); }
    get emailSubject() { return this.formGroup.get('emailSubject'); }
    get emailMessage() { return this.formGroup.get('emailMessage'); }

    closeEditor() {
        this.invitation = undefined;

        this.formGroup.setValue({
            code: "",
            emailAddress: "",
            emailSubject: "",
            emailMessage: ""
        });

        this.editModeFalse.emit(false);
    }

    onSubmit() {
        let invitation = new Invitation;

        invitation.code = this.formGroup.value.code;
        invitation.emailAddress = this.formGroup.value.emailAddress;
        invitation.emailSubject = this.formGroup.value.emailSubject;
        invitation.emailMessage = this.formGroup.value.emailMessage;

        if (this.invitation?.id == undefined) {
            this.invitationService.postInvitation(invitation)
        } else if (this.invitation?.id != undefined) {
            this.invitationService.putInvitation(this.invitation?.id, invitation);
        }

        this.closeEditor();
    }
}
