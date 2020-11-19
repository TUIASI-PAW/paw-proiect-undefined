import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizareComponent } from './actualizare.component';

describe('ActualizareComponent', () => {
  let component: ActualizareComponent;
  let fixture: ComponentFixture<ActualizareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
