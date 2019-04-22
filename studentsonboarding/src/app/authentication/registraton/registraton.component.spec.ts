import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistratonComponent } from './registraton.component';

describe('RegistratonComponent', () => {
  let component: RegistratonComponent;
  let fixture: ComponentFixture<RegistratonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistratonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistratonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
