import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "@shared/header/header.component";
import {MangeTasksComponent} from "@app/task/mange-tasks/mange-tasks.component";

@Component({
    selector: 'app-dashboard',
    imports: [
        HeaderComponent,
        MangeTasksComponent
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit  {
  constructor(
  ) {}

  ngOnInit() {
  }
}
