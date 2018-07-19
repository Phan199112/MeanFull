import { TestBed, inject } from '@angular/core/testing';

import { MygroupsService } from './mygroups.service';

describe('MygroupsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MygroupsService]
    });
  });

  it('should be created', inject([MygroupsService], (service: MygroupsService) => {
    expect(service).toBeTruthy();
  }));
});
