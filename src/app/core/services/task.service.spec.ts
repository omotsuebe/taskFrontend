import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting(), provideRouter([])],
    });
    service = TestBed.inject(TaskService);
  });

  it('Task should be created', () => {
    expect(service).toBeTruthy();
  });
});
