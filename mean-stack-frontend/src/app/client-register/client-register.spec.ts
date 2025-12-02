import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientRegister } from './client-register';
import { FormsModule } from '@angular/forms';  // Import FormsModule

describe('ClientRegister', () => {
  let component: ClientRegister;
  let fixture: ComponentFixture<ClientRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientRegister],  // Declare the component
      imports: [FormsModule]  // Import FormsModule for ngModel
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test if the client object is initialized with empty values
  it('should initialize client object with empty values', () => {
    expect(component.client.name).toBe('');
    expect(component.client.email).toBe('');
    expect(component.client.password).toBe('');
  });

  // Test the form data binding (ngModel)
  it('should update client object when form fields change', () => {
    component.client.name = 'John Doe';
    component.client.email = 'john@example.com';
    component.client.password = 'password123';

    fixture.detectChanges();  // Trigger change detection

    expect(component.client.name).toBe('John Doe');
    expect(component.client.email).toBe('john@example.com');
    expect(component.client.password).toBe('password123');
  });
});

