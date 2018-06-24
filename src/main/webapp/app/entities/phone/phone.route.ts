import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PhoneComponent } from './phone.component';
import { PhoneDetailComponent } from './phone-detail.component';
import { PhonePopupComponent } from './phone-dialog.component';
import { PhoneDeletePopupComponent } from './phone-delete-dialog.component';

@Injectable()
export class PhoneResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const phoneRoute: Routes = [
    {
        path: 'phone',
        component: PhoneComponent,
        resolve: {
            'pagingParams': PhoneResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Phones'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'phone/:id',
        component: PhoneDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Phones'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const phonePopupRoute: Routes = [
    {
        path: 'phone-new',
        component: PhonePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Phones'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'phone/:id/edit',
        component: PhonePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Phones'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'phone/:id/delete',
        component: PhoneDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Phones'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
