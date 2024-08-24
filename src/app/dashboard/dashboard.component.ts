import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {HeaderComponent} from "@shared/header/header.component";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MangeTasksComponent} from "@app/task/mange-tasks/mange-tasks.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    HeaderComponent,
    MatProgressBar,
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
