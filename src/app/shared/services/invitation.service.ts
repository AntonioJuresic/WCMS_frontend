import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Invitation } from '../models/invitation';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class InvitationService {

    invitations: Invitation[] = [];
    invitationsBS: BehaviorSubject<Invitation[]> = new BehaviorSubject<Invitation[]>([]);

    constructor(
        private dataService: DataService
    ) { }

    getInvitations() {
        this.dataService.getInvitations()
            .subscribe(
                (res: {
                    selectedInvitations: Invitation[]
                }) => {
                    this.invitations = res.selectedInvitations;
                    this.invitationsBS.next(this.invitations);
                });
    }

    postInvitation(invitation: Invitation) {
        this.dataService.postInvitation(invitation)
            .subscribe(
                (res: {
                    status: Number,
                    selectedInvitation: Invitation[]
                }) => {
                    this.invitations.push(res.selectedInvitation[0]);
                    this.invitationsBS.next(this.invitations);
                });
    }

    putInvitation(id: Number, invitation: Invitation) {
        this.dataService.putInvitation(id, invitation)
            .subscribe(
                (res: {
                    status: Number,
                    selectedInvitation: Invitation[]
                }) => {
                    //this.invitations = this.invitations.map(i => i.id !== res.selectedInvitation[0].id ? i : res.selectedInvitation[0]);
                    this.invitations[this.invitations.findIndex(i => i.id === res.selectedInvitation[0].id)] = res.selectedInvitation[0];  
                    this.invitationsBS.next(this.invitations);
                });
    }

    deleteInvitation(id: Number) {
        this.dataService.deleteInvitation(id)
            .subscribe(
                res => {
                    this.invitations = this.invitations.filter(i => i.id != id);
                    this.invitationsBS.next(this.invitations);
                });
    }
}
