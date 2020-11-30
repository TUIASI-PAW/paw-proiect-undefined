import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreareComponent } from './creare.component';

describe('CreareComponent', () => {
  let component: CreareComponent;
  let fixture: ComponentFixture<CreareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
