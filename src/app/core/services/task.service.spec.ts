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

  it('Task should have a create method', () => {
    expect(service.getTasks).toBeTruthy();
  });

  it('Task should have a get method', () => {
    expect(service.createTask).toBeTruthy();
  });

  it('Task should have a update method', () => {
    expect(service.updateTask).toBeTruthy();
  });

  it('Task should have multiple on drag and drop method', () => {
    expect(service.updateTasks).toBeTruthy();
  });

  it('Task should have a delete method', () => {
    expect(service.deleteTask).toBeTruthy();
  });

});
