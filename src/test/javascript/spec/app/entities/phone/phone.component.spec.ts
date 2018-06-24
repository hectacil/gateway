/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { PhoneComponent } from '../../../../../../main/webapp/app/entities/phone/phone.component';
import { PhoneService } from '../../../../../../main/webapp/app/entities/phone/phone.service';
import { Phone } from '../../../../../../main/webapp/app/entities/phone/phone.model';

describe('Component Tests', () => {

    describe('Phone Management Component', () => {
        let comp: PhoneComponent;
        let fixture: ComponentFixture<PhoneComponent>;
        let service: PhoneService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [PhoneComponent],
                providers: [
                    PhoneService
                ]
            })
            .overrideTemplate(PhoneComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PhoneComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PhoneService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Phone(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.phones[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
