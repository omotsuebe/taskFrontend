import {Component, OnInit} from '@angular/core';
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
    this.authService.currentUser.subscribe(data => {
      if (data) {
        this.user = data;
      }
    });
  }

  logout() {
    this.authService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

}
