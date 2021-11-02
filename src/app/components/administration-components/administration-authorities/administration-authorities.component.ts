import { Component, OnInit } from '@angular/core';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Authority } from 'src/app/shared/models/authority';
import { AuthorityService } from 'src/app/shared/services/authority.service';

@Component({
    selector: 'app-administration-authorities',
    templateUrl: './administration-authorities.component.html',
    styleUrls: ['./administration-authorities.component.scss']
})
export class AdministrationAuthoritiesComponent implements OnInit {

    faPencilAlt = faPencilAlt;
    faTrash = faTrash;

    authorities: Authority[] = [];
    authoritiesSubscription: Subscription = new Subscription;

    editMode: Boolean = false;
    authorityForEdit?: Authority;

    constructor(
        private authorityService: AuthorityService
    ) { }

    ngOnInit(): void {
        this.authorityService.getAuthorities();

        this.authoritiesSubscription = this.authorityService.authoritiesBS
            .subscribe(
                res => {
                    this.authorities = res;
                });

    }

    openEditor(selectedAuthority?: Authority) {
        this.editMode = true;
        this.authorityForEdit = selectedAuthority;
    }

    closeEditor(boolean: Boolean) {
        this.editMode = boolean;
    }

    deleteAuthority(id: Number) {
        this.authorityService.deleteAuthority(id);
    }

    ngOnDestroy(): void {
        this.authoritiesSubscription.unsubscribe();
    }

}
