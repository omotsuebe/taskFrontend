import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly endpoint = '/tasks';

  constructor(private apiService: ApiService) {}

  // Get a list of tasks or a single task by ID
  getTasks(params: HttpParams = new HttpParams()): Observable<any> {
    return this.apiService.get(this.endpoint, params);
  }

  // Create a new task
  createTask(task: any): Observable<any> {
    return this.apiService.post(this.endpoint, task);
  }

  // Update an existing task by ID
  updateTask(id: number, task: any): Observable<any> {
    return this.apiService.put(`${this.endpoint}/${id}`, task);
  }

  // Update multiple tasks
  updateTasks(task: any): Observable<any> {
    return this.apiService.post(`${this.endpoint}/update-multiple`, task);
  }

  // Delete a task by ID
  deleteTask(id: string): Observable<any> {
    return this.apiService.delete(`${this.endpoint}/${id}`);
  }
}

