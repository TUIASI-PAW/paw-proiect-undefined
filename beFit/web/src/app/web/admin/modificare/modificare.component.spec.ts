import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificareComponent } from './modificare.component';

describe('ModificareComponent', () => {
  let component: ModificareComponent;
  let fixture: ComponentFixture<ModificareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
