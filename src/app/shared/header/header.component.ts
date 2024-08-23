import {Component, Input} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {User} from "@core/interfaces/User";
import {AuthService} from "@core/services/auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() user!: User;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  logout() {
    this.authService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

}
