import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialDeJugadasComponent } from './historial-de-jugadas.component';

describe('HistorialDeJugadasComponent', () => {
  let component: HistorialDeJugadasComponent;
  let fixture: ComponentFixture<HistorialDeJugadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialDeJugadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialDeJugadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
