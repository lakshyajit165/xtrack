import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditPaymentPage } from './edit-payment.page';

describe('EditPaymentPage', () => {
  let component: EditPaymentPage;
  let fixture: ComponentFixture<EditPaymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPaymentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditPaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
