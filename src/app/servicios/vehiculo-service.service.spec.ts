import { TestBed, inject } from '@angular/core/testing';

import { VehiculoServiceService } from './vehiculo-service.service';

describe('VehiculoServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehiculoServiceService]
    });
  });

  it('should be created', inject([VehiculoServiceService], (service: VehiculoServiceService) => {
    expect(service).toBeTruthy();
  }));
});
