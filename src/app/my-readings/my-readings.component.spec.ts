import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReadingsComponent } from './my-readings.component';

describe('MyReadingsComponent', () => {
  let component: MyReadingsComponent;
  let fixture: ComponentFixture<MyReadingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyReadingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyReadingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
