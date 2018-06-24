import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Phone } from './phone.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Phone>;

@Injectable()
export class PhoneService {

    private resourceUrl =  SERVER_API_URL + 'phoneservice/api/phones';
    private resourceSearchUrl = SERVER_API_URL + 'phoneservice/api/_search/phones';

    constructor(private http: HttpClient) { }

    create(phone: Phone): Observable<EntityResponseType> {
        const copy = this.convert(phone);
        return this.http.post<Phone>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(phone: Phone): Observable<EntityResponseType> {
        const copy = this.convert(phone);
        return this.http.put<Phone>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Phone>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Phone[]>> {
        const options = createRequestOption(req);
        return this.http.get<Phone[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Phone[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Phone[]>> {
        const options = createRequestOption(req);
        return this.http.get<Phone[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Phone[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Phone = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Phone[]>): HttpResponse<Phone[]> {
        const jsonResponse: Phone[] = res.body;
        const body: Phone[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Phone.
     */
    private convertItemFromServer(phone: Phone): Phone {
        const copy: Phone = Object.assign({}, phone);
        return copy;
    }

    /**
     * Convert a Phone to a JSON which can be sent to the server.
     */
    private convert(phone: Phone): Phone {
        const copy: Phone = Object.assign({}, phone);
        return copy;
    }
}
