import {Component, inject, OnInit} from '@angular/core';
import {Task} from "@core/interfaces/Task";
import {TaskService} from "@core/services/task.service";
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragPlaceholder,
  CdkDropList,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import {Dialog, DialogModule} from '@angular/cdk/dialog';
import {CreateTaskComponent} from "@app/task/create-task/create-task.component";

@Component({
  selector: 'app-mange-tasks',
  standalone: true,
  imports: [CdkDropList, CdkDrag, DialogModule, CreateTaskComponent, CdkDragPlaceholder],
  templateUrl: './mange-tasks.component.html',
  styleUrl: './mange-tasks.component.scss'
})
export class MangeTasksComponent implements OnInit{
  isLoading = false;
  tasks!: Task[];
  taskActive: any;
  taskDone: any;
  task!: Task;
  dialog = inject(Dialog);

  constructor(
    private taskService: TaskService,
  ) {}

  ngOnInit() {
    this.getTasks();
  }

  openDialog(task: any) {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      minWidth: '500px',
      autoFocus: false,
      data: {
        task: task,
      },
    });
    dialogRef.closed.subscribe(result => {
      this.getTasks();
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    const eventType = event.previousContainer === event.container ? 'reorder' : 'drop';
    if (eventType === 'reorder') {
      // Moving items within the same container
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      // Log and map tasks in the 'taskActive' array
      const taskActive = this.taskActive.map((task: any) => ({
        id: task.id,
        sortOrder: task.sortOrder,
        name: task.name,
        eventType: eventType,
      }));
      this.updateTasks(taskActive);
    } else {
      // Moving items between different containers
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      // Map 'taskDone' array and update tasks
      const taskDone = this.taskDone.map((task: any) => ({
        id: task.id,
        status: 0,
        name: task.name,
        eventType: eventType,
      }));
      this.updateTasks(taskDone);
    }
  }

  getTasks(){
    this.isLoading = true;
    this.taskService.getTasks().subscribe({
      next: (data: any) => {
        this.tasks = data.data;
        this.taskActive = data.data.filter((task: any) => task.status === 1);
        this.taskDone = data.data.filter((task: any) => task.status === 0);
        this.isLoading = false;
      },
      error: error => {
        this.isLoading = false;
      }
    });
  }

  updateTasks(tasks: any){
    this.isLoading = true;
    this.taskService.updateTasks(tasks).subscribe({
      next: (data: any) => {
        //this.tasks = data.data;
        console.log('done');
      },
      error: error => {
        this.isLoading = false;
      }
    });
  }

  getTask(task: Task) {
    this.task = task;
    this.openDialog(task);
  }


}
