import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbabilidadOcurrenciaComponent } from './probabilidad-ocurrencia.component';

describe('ProbabilidadOcurrenciaComponent', () => {
  let component: ProbabilidadOcurrenciaComponent;
  let fixture: ComponentFixture<ProbabilidadOcurrenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProbabilidadOcurrenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProbabilidadOcurrenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
