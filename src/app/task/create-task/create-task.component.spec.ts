import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskComponent } from './create-task.component';
import {TaskService} from "@core/services/task.service";
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";

describe('CreateTaskComponent', () => {
  let component: CreateTaskComponent;
  let fixture: ComponentFixture<CreateTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTaskComponent],
      providers: [
        TaskService,
        { provide: MAT_DIALOG_DATA, useValue: {} }, // Provide mock data
        { provide: DIALOG_DATA, useValue: {} }, // Provide mock data
        { provide: DialogRef, useValue: {} }, // Mock MatDialogRef
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(), provideRouter([]),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('task should create', () => {
    expect(component).toBeTruthy();
  });
});
