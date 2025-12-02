import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderLogin } from './service-provider-login';

describe('ServiceProviderLogin', () => {
  let component: ServiceProviderLogin;
  let fixture: ComponentFixture<ServiceProviderLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceProviderLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceProviderLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
