import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarModalComponent } from './asignar-modal.component';

describe('AsignarModalComponent', () => {
  let component: AsignarModalComponent;
  let fixture: ComponentFixture<AsignarModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
