import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Invitation } from 'src/app/shared/models/invitation';
import { InvitationService } from 'src/app/shared/services/invitation.service';

@Component({
  selector: 'app-administration-invitations',
  templateUrl: './administration-invitations.component.html',
  styleUrls: ['./administration-invitations.component.scss']
})
export class AdministrationInvitationsComponent implements OnInit {
    
    faPencilAlt = faPencilAlt;
    faTrash = faTrash;

    invitations: Invitation[] = [];
    invitationsSubscription: Subscription = new Subscription;

    editMode : Boolean = false;
    invitationForEdit? : Invitation;

    constructor(
        private invitationService: InvitationService
    ) { }

    ngOnInit(): void {
        this.invitationService.getInvitations();

        this.invitationsSubscription = this.invitationService.invitationsBS
            .subscribe(res => {
                this.invitations = res;
            });
    }

    openEditor(selectedInvitation? : Invitation) {
        this.editMode = true;
        this.invitationForEdit = selectedInvitation;
    }

    closeEditor(boolean: Boolean) {
        this.editMode = boolean;
    }

    deleteInvitation(id: Number) {
        this.invitationService.deleteInvitation(id);
    }

    ngOnDestroy(): void {
        this.invitationsSubscription.unsubscribe();
    }
}