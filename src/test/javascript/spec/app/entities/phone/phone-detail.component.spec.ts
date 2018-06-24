/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { PhoneDetailComponent } from '../../../../../../main/webapp/app/entities/phone/phone-detail.component';
import { PhoneService } from '../../../../../../main/webapp/app/entities/phone/phone.service';
import { Phone } from '../../../../../../main/webapp/app/entities/phone/phone.model';

describe('Component Tests', () => {

    describe('Phone Management Detail Component', () => {
        let comp: PhoneDetailComponent;
        let fixture: ComponentFixture<PhoneDetailComponent>;
        let service: PhoneService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [PhoneDetailComponent],
                providers: [
                    PhoneService
                ]
            })
            .overrideTemplate(PhoneDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PhoneDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PhoneService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Phone(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.phone).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
