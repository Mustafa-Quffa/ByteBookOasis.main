import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MockAuthService } from '@services/mock-auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let mockAuthService: MockAuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [LoginComponent],
      providers: [MockAuthService]
    });

    component = TestBed.createComponent(LoginComponent).componentInstance;
    mockAuthService = TestBed.inject(MockAuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should login successfully', () => {
    const loginData = { username: 'testuser', password: 'password123' };
    const response = { success: true, token: 'mock-token' };

    component.username = loginData.username;
    component.password = loginData.password;

    component.login();

    mockAuthService.login(loginData.username, loginData.password).subscribe(res => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne('/api/login');
    expect(req.request.method).toBe('POST');
    req.flush(response);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
