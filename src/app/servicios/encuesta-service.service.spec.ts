import { TestBed, inject } from '@angular/core/testing';

import { EncuestaServiceService } from './encuesta-service.service';

describe('EncuestaServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EncuestaServiceService]
    });
  });

  it('should be created', inject([EncuestaServiceService], (service: EncuestaServiceService) => {
    expect(service).toBeTruthy();
  }));
});
