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

/**
 * Component for managing tasks with drag-and-drop functionality.
 * This component allows users to reorder tasks and move them between different status categories (active and done).
 */
@Component({
  selector: 'app-mange-tasks',
  standalone: true,
  imports: [CdkDropList, CdkDrag, DialogModule, CreateTaskComponent, CdkDragPlaceholder],
  templateUrl: './mange-tasks.component.html',
  styleUrl: './mange-tasks.component.scss'
})
export class MangeTasksComponent implements OnInit{
  isLoading = false; // Indicates if a request is in progress
  tasks!: Task[]; // Array of tasks
  taskActive: any; // Array of active tasks
  taskDone: any; // Array of completed tasks
  task!: Task; // Task to be edited or viewed
  dialog = inject(Dialog); // Dialog service for opening task dialogs

  /**
   * Constructor for the MangeTasksComponent.
   * @param taskService - The TaskService used to interact with task data.
   */
  constructor(
    private taskService: TaskService,
  ) {}

  /**
   * Initializes the component by fetching the list of tasks.
   */
  ngOnInit() {
    this.getTasks();
  }

  /**
   * Opens a dialog to create or edit a task.
   * @param task - The task data to be passed to the dialog.
   */
  openDialog(task: any) {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      minWidth: '500px',
      autoFocus: false,
      data: {
        task: task,
      },
    });
    dialogRef.closed.subscribe(result => {
      this.getTasks(); // Refresh tasks when the dialog is closed
    });
  }

  /**
   * Handles the drag-and-drop events to reorder or move tasks between lists.
   * @param event - The CdkDragDrop event containing information about the drag-and-drop operation.
   */
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

  /**
   * Fetches the list of tasks from the server.
   */
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

  /**
   * Updates the tasks on the server after a drag-and-drop operation.
   * @param tasks - The array of tasks to be updated.
   */
  updateTasks(tasks: any){
    this.isLoading = true;
    this.taskService.updateTasks(tasks).subscribe({
      next: (data: any) => {
        console.log('done');
      },
      error: error => {
        this.isLoading = false;
      }
    });
  }

  /**
   * Opens a dialog to create or edit a specific task.
   * @param task - The task data to be passed to the dialog.
   */
  getTask(task: Task) {
    this.task = task;
    this.openDialog(task);
  }


}
