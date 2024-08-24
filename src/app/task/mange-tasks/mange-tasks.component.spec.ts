import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangeTasksComponent } from './mange-tasks.component';
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {TaskService} from "@core/services/task.service";

describe('MangeTasksComponent', () => {
  let component: MangeTasksComponent;
  let fixture: ComponentFixture<MangeTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangeTasksComponent],
      providers: [
        TaskService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(), provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangeTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('task should create', () => {
    expect(component).toBeTruthy();
  });
});
