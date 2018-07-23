import { TestBed, inject } from '@angular/core/testing';

import { ViajeServiceService } from './viaje-service.service';

describe('ViajeServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViajeServiceService]
    });
  });

  it('should be created', inject([ViajeServiceService], (service: ViajeServiceService) => {
    expect(service).toBeTruthy();
  }));
});
