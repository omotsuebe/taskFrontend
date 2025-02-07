import { Component, OnInit, inject } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {User} from "@core/interfaces/User";
import {AuthService} from "@core/services/auth.service";
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
    selector: 'app-header',
    imports: [
        RouterLink,
        MatProgressBar
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = false;
  user!: User;

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
