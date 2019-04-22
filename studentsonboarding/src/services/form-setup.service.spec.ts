import { TestBed } from '@angular/core/testing';

import { FormSetupService } from './form-setup.service';

describe('FormSetupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormSetupService = TestBed.get(FormSetupService);
    expect(service).toBeTruthy();
  });
});
