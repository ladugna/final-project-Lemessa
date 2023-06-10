import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendOfferComponent } from './send-offer.component';

describe('SendOfferComponent', () => {
  let component: SendOfferComponent;
  let fixture: ComponentFixture<SendOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
