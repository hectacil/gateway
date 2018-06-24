import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Phone } from './phone.model';
import { PhonePopupService } from './phone-popup.service';
import { PhoneService } from './phone.service';

@Component({
    selector: 'jhi-phone-dialog',
    templateUrl: './phone-dialog.component.html'
})
export class PhoneDialogComponent implements OnInit {

    phone: Phone;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private phoneService: PhoneService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.phone.id !== undefined) {
            this.subscribeToSaveResponse(
                this.phoneService.update(this.phone));
        } else {
            this.subscribeToSaveResponse(
                this.phoneService.create(this.phone));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Phone>>) {
        result.subscribe((res: HttpResponse<Phone>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Phone) {
        this.eventManager.broadcast({ name: 'phoneListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-phone-popup',
    template: ''
})
export class PhonePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private phonePopupService: PhonePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.phonePopupService
                    .open(PhoneDialogComponent as Component, params['id']);
            } else {
                this.phonePopupService
                    .open(PhoneDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
