import {Component, Input, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {User} from "@core/interfaces/User";
import {AuthService} from "@core/services/auth.service";
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    MatProgressBar
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
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

  logout() {
    this.authService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

}
