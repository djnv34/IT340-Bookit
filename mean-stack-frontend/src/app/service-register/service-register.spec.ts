import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRegister } from './service-register';

describe('ServiceRegister', () => {
  let component: ServiceRegister;
  let fixture: ComponentFixture<ServiceRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
