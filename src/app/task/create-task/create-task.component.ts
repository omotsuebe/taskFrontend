import {Component, inject, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TaskService} from "@core/services/task.service";
import {Task} from "@core/interfaces/Task";
import {MatProgressBar} from "@angular/material/progress-bar";
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatProgressBar
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent implements OnInit {

  task!: Task;
  taskForm!: FormGroup;
  isLoading = false;
  submitted = false;
  errorMsg: any;
  successMsg: any;
  isForm = false;
  dialogRef = inject(DialogRef);


  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    @Inject(DIALOG_DATA) public data: any
  ) {
    this.task = this.data.task;
    console.log(this.task);
  }

  ngOnInit() {
    this.createForm();
  }

  dialogClose(){
    this.dialogRef.close();
  }

  private createForm() {
    if(this.task) {
      this.isForm = true;
      this.taskForm = this.formBuilder.group({
        id: [this.task.id],
        status: [1],
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

  hasError = (controlName: string, errorName: string) => {
    if (this.submitted) {
      return this.taskForm.controls[controlName].hasError(errorName);
    } else {
      return false;
    }
  };

  // Submit the form
  onSubmit() {
    if(this.taskForm.value.id){
      this.updateTask();
    }else{
      this.createTask();
    }
  }

  createTask() {
    this.submitted = true;
    this.isLoading = true;
    if (this.taskForm.valid) {
      this.taskService.createTask(this.taskForm.value).subscribe({
        next: (data: any) => {
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

  updateTask() {
    this.submitted = true;
    this.isLoading = true;
    if (this.taskForm.valid) {
      this.taskService.updateTask(this.taskForm.value.id, this.taskForm.value).subscribe({
        next: (data: any) => {
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

  deleteTask(){
    this.isLoading = true;
    this.taskService.deleteTask(this.taskForm.value.id).subscribe({
      next: (data: any) => {
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
