import { TestBed, inject } from '@angular/core/testing';

import { ArchivoServiceService } from './archivo-service.service';

describe('ArchivoServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArchivoServiceService]
    });
  });

  it('should be created', inject([ArchivoServiceService], (service: ArchivoServiceService) => {
    expect(service).toBeTruthy();
  }));
});
