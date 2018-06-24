import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Phone } from './phone.model';
import { PhoneService } from './phone.service';

@Component({
    selector: 'jhi-phone-detail',
    templateUrl: './phone-detail.component.html'
})
export class PhoneDetailComponent implements OnInit, OnDestroy {

    phone: Phone;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private phoneService: PhoneService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPhones();
    }

    load(id) {
        this.phoneService.find(id)
            .subscribe((phoneResponse: HttpResponse<Phone>) => {
                this.phone = phoneResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPhones() {
        this.eventSubscriber = this.eventManager.subscribe(
            'phoneListModification',
            (response) => this.load(this.phone.id)
        );
    }
}
