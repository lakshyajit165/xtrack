import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrscanPage } from './qrscan.page';

describe('QrscanPage', () => {
  let component: QrscanPage;
  let fixture: ComponentFixture<QrscanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrscanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QrscanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
