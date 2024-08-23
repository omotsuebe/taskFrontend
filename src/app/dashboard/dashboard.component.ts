import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {HeaderComponent} from "@shared/header/header.component";
import {AuthService} from "@core/services/auth.service";
import {User} from "@core/interfaces/User";
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    HeaderComponent,
    MatProgressBar
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit  {
  isLoading = false;
  user!: User;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userProfile();
  }

  userProfile(){
    this.isLoading = true;
    this.authService.profile().subscribe({
      next: (data: any) => {
        this.user = data.data;
        this.isLoading = false;
      },
      error: error => {
        this.isLoading = false;
      }
    })
  }



}
