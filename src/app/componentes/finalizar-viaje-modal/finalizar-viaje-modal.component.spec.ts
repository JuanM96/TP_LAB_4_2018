import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarViajeModalComponent } from './finalizar-viaje-modal.component';

describe('FinalizarViajeModalComponent', () => {
  let component: FinalizarViajeModalComponent;
  let fixture: ComponentFixture<FinalizarViajeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizarViajeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizarViajeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
