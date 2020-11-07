import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoevaluacionProcesosComponent } from './autoevaluacion-procesos.component';

describe('AutoevaluacionProcesosComponent', () => {
  let component: AutoevaluacionProcesosComponent;
  let fixture: ComponentFixture<AutoevaluacionProcesosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoevaluacionProcesosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoevaluacionProcesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
