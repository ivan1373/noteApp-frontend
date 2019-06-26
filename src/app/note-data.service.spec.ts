import { TestBed } from '@angular/core/testing';

import { NoteDataService } from './note-data.service';

describe('NoteDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoteDataService = TestBed.get(NoteDataService);
    expect(service).toBeTruthy();
  });
});
