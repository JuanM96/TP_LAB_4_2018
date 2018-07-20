import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmChoferesComponent } from './abm-choferes.component';

describe('AbmChoferesComponent', () => {
  let component: AbmChoferesComponent;
  let fixture: ComponentFixture<AbmChoferesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmChoferesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmChoferesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
