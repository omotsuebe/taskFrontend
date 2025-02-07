import { Component, inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TaskService} from "@core/services/task.service";
import {Task} from "@core/interfaces/Task";
import {MatProgressBar} from "@angular/material/progress-bar";
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';

@Component({
    selector: 'app-create-task',
    imports: [
        ReactiveFormsModule,
        MatProgressBar
    ],
    templateUrl: './create-task.component.html',
    styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private taskService = inject(TaskService);
  data = inject(DIALOG_DATA);


  task!: Task; // Task data to be edited or created
  taskForm!: FormGroup; // Reactive form group for task data
  isLoading = false; // Indicates if a request is in progress
  submitted = false; // Indicates if the form has been submitted
  errorMsg: any; // Stores error messages
  successMsg: any; // Stores success messages
  isForm = false; // Indicates if the form is for editing or creating
  dialogRef = inject(DialogRef); // Dialog reference for closing the dialog

  /**
   * Constructor for the CreateTaskComponent.
   * @param formBuilder - The FormBuilder service to create reactive forms.
   * @param taskService - The TaskService to interact with task data.
   * @param data - The dialog data containing the task information.
   */
  constructor() {
    this.task = this.data.task; // Initialize task from dialog data
  }

  /**
   * Initializes the component by setting up the form.
   */
  ngOnInit() {
    this.createForm();// Create the form on initialization
  }

  dialogClose(){
    this.dialogRef.close();
  }

  /**
   * Creates the form group with initial values and validators.
   */
  private createForm() {
    if(this.task) {
      // Set to true if editing an existing task
      this.taskForm = this.formBuilder.group({
        id: [this.task.id],
        status: [this.task.status],
        name: [this.task.name, Validators.required],
        project_type: [this.task.project_type, Validators.required],
        priority: [this.task.priority, Validators.required],
      });
    }else{
      // Initialize the form with validators
      this.taskForm = this.formBuilder.group({
        id: [0],
        status: [1],
        name: ['', Validators.required],
        project_type: ['', Validators.required],
        priority: ['', Validators.required],
      });
    }
  }

  /**
   * Checks for form control errors.
   * @param controlName - The name of the form control.
   * @param errorName - The error type to check.
   * @returns True if there is an error, otherwise false.
   */
  hasError = (controlName: string, errorName: string) => {
    if (this.submitted) {
      return this.taskForm.controls[controlName].hasError(errorName);
    } else {
      return false;
    }
  };

  /**
   * Handles form submission.
   * Determines whether to create or update a task based on the form value.
   */
  onSubmit() {
    if(this.taskForm.value.id){
      this.updateTask();
    }else{
      this.createTask();
    }
  }
  /**
   * Creates a new task.
   */
  createTask() {
    this.submitted = true;
    this.isLoading = true;
    if (this.taskForm.valid) {
      this.taskService.createTask(this.taskForm.value).subscribe({
        next: data => {
          if (data.result) {
            this.isLoading = false;
            this.successMsg = 'Task created successfully.';
            this.dialogClose();
          } else {
            this.isLoading = false;
            this.errorMsg = 'Task not created';
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMsg = error;
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
  /**
   * Updates an existing task.
   */
  updateTask() {
    this.submitted = true;
    this.isLoading = true;
    if (this.taskForm.valid) {
      this.taskService.updateTask(this.taskForm.value.id, this.taskForm.value).subscribe({
        next: data => {
          if (data.result) {
            this.isLoading = false;
            this.successMsg = 'Task update successfully.';
            this.dialogClose();
          } else {
            this.isLoading = false;
            this.errorMsg = 'Task not updated';
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMsg = error;
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
  /**
   * Deletes the task.
   */
  deleteTask(){
    this.isLoading = true;
    this.taskService.deleteTask(this.taskForm.value.id).subscribe({
      next: data => {
        this.isLoading = false;
        this.dialogClose();
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMsg = error;
      }
    });
  }

}
