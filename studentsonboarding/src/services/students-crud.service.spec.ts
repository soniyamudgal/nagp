import { TestBed } from '@angular/core/testing';

import { StudentsCRUDService } from './students-crud.service';

describe('StudentsCRUDService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentsCRUDService = TestBed.get(StudentsCRUDService);
    expect(service).toBeTruthy();
  });
});
