import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    const mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, provideHttpClientTesting],
      declarations: [LoginComponent],
      providers: [
        LoginService,
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the login form if valid', () => {
    const mockResponse = { success: true, token: 'mock-token' };
    spyOn(loginService, 'login').and.returnValue(of(mockResponse));

    component.loginForm.controls['email'].setValue('testuser@test.com');
    component.loginForm.controls['password'].setValue('password123');

    component.onSubmit();

    expect(loginService.login).toHaveBeenCalledWith({
      email: 'testuser@test.com',
      password: 'password123'
    });

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should not submit the form if invalid', () => {
    spyOn(loginService, 'login');

    component.onSubmit();

    expect(loginService.login).not.toHaveBeenCalled();
  });

  it('should handle failed login', () => {
    const mockErrorResponse = { status: 401, statusText: 'Unauthorized' };
    spyOn(loginService, 'login').and.returnValue(of(mockErrorResponse));

    component.loginForm.controls['email'].setValue('wronguser@test.com');
    component.loginForm.controls['password'].setValue('wrongpassword');

    component.onSubmit();

    fixture.detectChanges();

    expect(loginService.login).toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
    // You can add more expectations for error handling if you display error messages
  });
});
