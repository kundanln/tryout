import { TestBed, inject } from '@angular/core/testing';

import { BaseserviceService } from './baseservice.service';

describe('BaseserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseserviceService]
    });
  });

  it('should be created', inject([BaseserviceService], (service: BaseserviceService) => {
    expect(service).toBeTruthy();
  }));
});
